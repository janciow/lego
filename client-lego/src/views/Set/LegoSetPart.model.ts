class LegoSetPart {
    constructor(
        public brick_id: string | null,
        public category: string | null,
        public color_exact_id: number | null,
        public description: string | undefined,
        public element_id: string,
        public img_pathname: string | null,
        public lego_set_id: string,
        public model_id: string | null,
        public price: number | null,
        public quantity: number | null,
        public quantity_free_bricks: number | null,
        public quantity_in_set: number | null,
        public quantity_in_sets_total: number | null,
        public quantity_total: number | null,
    ) { }
}

export default LegoSetPart