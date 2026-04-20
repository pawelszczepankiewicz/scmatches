import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  participant1?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  participant2?: string;

  @ValidateIf(() => true)
  @IsNotEmpty()
  score?: string | string[][];
}
