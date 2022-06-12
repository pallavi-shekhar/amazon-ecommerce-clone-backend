import ProductMedia, { ProductMediaModel } from '../model/ProductMedia';

export default class ProductMediaRepo {
  public static create(productMedias: ProductMedia[]): Promise<ProductMedia[] | null> {

    return ProductMediaModel.insertMany(productMedias);
  }
}