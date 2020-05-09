export class CreateProduct {
    constructor(name= '',description= '', type = '', price = 0, units = 0, important = true, discount = 0){
        this.name = name;
        this.description = description;
        this.type = type;
        this.price = price;
        this.units = units;
        this.important = important;
        this.discount = discount;
    }
    name: string;
    description: string;
    type: string;
    price: number;
    units: number;
    important: boolean;
    discount: number;
}
