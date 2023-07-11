type TChocolate ={
    id: number,
    type: string,
    weight: number,
    price: number,
    cocoa_percentage: number,
    in_stock: number,
    more_ingredients?: string | undefined
}

type TChocolateRequest = Omit<TChocolate, "id">

export { TChocolate, TChocolateRequest}