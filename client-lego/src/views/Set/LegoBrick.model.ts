class LegoBrick {
    constructor(
        public color_exact_id: number | null = null,
        public category: string = '',
        public element_id: string = '',
        public model_id: string | null = '',
        public price: number | null = null,
        public description: string | null = null,
        public img_pathname: string | null = null,
        public quantity_free_bricks: string | null = null,
        public quantity_total: number | null = null,
    ) { }
}

export default LegoBrick