import { Request, Response } from 'express';
import { CreateProductController } from '../../src/Controllers/Product/CreateProductController'; // Corrigido o casing da pasta
import { CreateProductService } from '../../src/Services/Product/CreateProductService';

jest.mock('../../src/Services/Product/CreateProductService');

describe('createProductController', () => {
  let createProductController: CreateProductController;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let mockCreateProductService: jest.Mocked<CreateProductService>;

  beforeEach(() => {
    createProductController = new CreateProductController();

    request = {
      body: {
        name: 'Product 1',
        price: '100',
        description: 'A great product',
        banner: 'image.jpg',
        category_id: 'category_123',
        amount: 10,
      },
      file: {
        originalname: 'image.jpg',
        filename: 'image_123.jpg',
        fieldname: 'banner',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 5000, 
        destination: 'uploads/',
        path: 'uploads/image_123.jpg',
        buffer: Buffer.from(''),
      } as Express.Multer.File,
    };

    response = {
      json: jest.fn(),
    };

    mockCreateProductService = new CreateProductService() as jest.Mocked<CreateProductService>;
    (CreateProductService as jest.Mock).mockImplementation(() => mockCreateProductService);
  });

  it('deve criar um produto e retornar o resultado', async () => {
    const mockProduct = {
      id: 'product_123',
      name: 'Product 1',
      price: '100',
      description: 'A great product',
      banner: 'image_123.jpg',
      category_id: 'category_123',
      amount: 10,
      created_at: null,
      update_at: null,
    };

    mockCreateProductService.execute.mockResolvedValueOnce(mockProduct);

    await createProductController.handle(request as Request, response as Response);

    expect(mockCreateProductService.execute).toHaveBeenCalledWith({
      name: 'Product 1',
      price: '100',
      description: 'A great product',
      banner: 'image_123.jpg',
      category_id: 'category_123',
      amount: 10,
    });

    expect(response.json).toHaveBeenCalledWith(mockProduct);
  });

  it('deve lançar erro quando não houver imagem', async () => {
    request.file = undefined;

    await expect(createProductController.handle(request as Request, response as Response))
      .rejects
      .toThrow('Error sending image');
  });
});
