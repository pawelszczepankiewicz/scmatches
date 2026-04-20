import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MatchesService } from './matches.service';
import { UpdateMatchDto } from './dto/update-score.dto';

@Controller('matches')
@UseGuards(ThrottlerGuard)
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async findAll() {
    return this.matchesService.findAll();
  }

  @Patch(':id/score')
  async updateScore(
    @Param('id') id: string,
    @Body() dto: UpdateMatchDto,
  ) {
    if (dto.score === undefined) {
      throw new BadRequestException('Score is required');
    }

    const result = await this.matchesService.updateScore(id, dto.score);
    if (!result) {
      const exists = await this.matchesService.exists(id);
      if (!exists) {
        throw new NotFoundException(`Match ${id} not found`);
      }
      throw new BadRequestException(
        `Invalid score format for this sport. Use "X:Y" for soccer/handball, "X:Y,S1,S2,..." for volleyball/tennis, or array for basketball.`,
      );
    }
    return result;
  }
}
