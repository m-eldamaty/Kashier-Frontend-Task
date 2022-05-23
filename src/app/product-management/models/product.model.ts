export class IProduct {
  id: number = 0;
  productName: string='';
  productType: string='';
  productCategory: string='';
  isSubCategory: boolean=false;
  referenceId?: number=0;
  password: string='';
  deliveryFeesValue: number=0;
  deliveryFeesPercent: number=0;
}
