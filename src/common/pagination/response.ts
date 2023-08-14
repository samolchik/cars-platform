import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PaginatedDto<TModel> {
  @ApiProperty({ example: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  pages: number;

  @ApiProperty({ example: 25, description: 'Total number of items' })
  countItem: number;

  @ApiProperty({ type: [Object], description: 'List of entities' })
  entities: TModel[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  property: string,
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(PaginatedDto) },
              {
                properties: {
                  [`${property}`]: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
