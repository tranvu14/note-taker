import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { Tag } from './entities/tag.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { SearchNotesDto } from './dto/search-notes.dto';
import { Like, In } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  private async getOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    // Find existing tags
    const existingTags = await this.tagsRepository.find({
      where: { name: In(tagNames) },
    });

    const existingTagNames = existingTags.map(tag => tag.name);
    const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));

    // Create new tags
    const newTags = newTagNames.map(name => this.tagsRepository.create({ name }));
    if (newTags.length > 0) {
      await this.tagsRepository.save(newTags);
    }

    return [...existingTags, ...newTags];
  }

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const { tags: tagNames, ...noteData } = createNoteDto;
    
    const note = this.notesRepository.create({
      ...noteData,
      user: { id: userId },
      reminderDate: createNoteDto.reminderDate ? new Date(createNoteDto.reminderDate) : null,
    });

    if (tagNames?.length) {
      note.tags = await this.getOrCreateTags(tagNames);
    }

    return this.notesRepository.save(note);
  }

  async findAll(userId: string, searchParams?: SearchNotesDto) {
    const queryBuilder = this.notesRepository.createQueryBuilder('note')
      .leftJoinAndSelect('note.tags', 'tag')
      .where('note.user.id = :userId', { userId });

    if (searchParams) {
      if (searchParams.search) {
        queryBuilder.andWhere(
          '(LOWER(note.title) LIKE LOWER(:search) OR LOWER(note.content) LIKE LOWER(:search))',
          { search: `%${searchParams.search}%` }
        );
      }

      if (searchParams.isPinned !== undefined) {
        queryBuilder.andWhere('note.isPinned = :isPinned', { isPinned: searchParams.isPinned });
      }

      if (searchParams.onlyArchived !== undefined) {
        queryBuilder.andWhere('note.isArchived = :isArchived', { isArchived: true });
      } else {
        // By default, show only unarchived notes
        queryBuilder.andWhere('note.isArchived = :isArchived', { isArchived: false });
      }

      if (searchParams.tagId) {
        queryBuilder.andWhere('tag.id = :tagId', { tagId: searchParams.tagId });
      }
    }

    queryBuilder.orderBy('note.isPinned', 'DESC')
      .addOrderBy('note.updatedAt', 'DESC');

    // Add pagination
    const page = searchParams?.page || 1;
    const limit = searchParams?.limit || 10;
    const skip = (page - 1) * limit;

    queryBuilder.skip(skip).take(limit);

    const [notes, total] = await queryBuilder.getManyAndCount();

    return {
      notes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['tags'],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    return note;
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(userId, id);
    const { tags: tagNames, ...noteData } = updateNoteDto;

    // If archiving the note, automatically unpin it
    if (noteData.isArchived === true) {
      noteData.isPinned = false;
    }

    if (tagNames?.length) {
      note.tags = await this.getOrCreateTags(tagNames);
    }

    if (updateNoteDto.reminderDate !== undefined) {
      note.reminderDate = updateNoteDto.reminderDate ? new Date(updateNoteDto.reminderDate) : null;
    }

    Object.assign(note, {
      ...noteData,
      updatedAt: new Date(),
    });

    return this.notesRepository.save(note);
  }

  async remove(userId: string, id: string): Promise<void> {
    const note = await this.findOne(userId, id);
    await this.notesRepository.remove(note);
  }
} 