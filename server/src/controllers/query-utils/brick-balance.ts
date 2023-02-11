const bbLeftJoin = (legoSetNumber: string) => {
  return `
	LEFT JOIN (
		SELECT brick.element_id as brick_id,
			lego_set_parts.quantity as quantity,
			lego_set_parts.lego_set_id as lego_set_id,
            lego_set_parts.quantity_in_set as quantity_build_in
		FROM lego_set_parts
			LEFT JOIN brick ON lego_set_parts.brick_id = brick.element_id
		WHERE lego_set_parts.lego_set_id = "${legoSetNumber}"
		ORDER BY brick.description
	) as s${legoSetNumber} ON s${legoSetNumber}.brick_id = brick.element_id
    `;
};

// example
// (
//     s7675.quantity IS NOT NULL
//     or s7676.quantity IS NOT NULL
//     or s10195.quantity IS NOT NULL
// )
// and (
//     s7675.lego_set_id = ?
//     or s7676.lego_set_id = ?
//     or s10195.lego_set_id = ?
// )

const bbWhere = (legoSetNumbers: any[]) => {
  return `
      (
        ${legoSetNumbers
          .map((setNum: number, index) => {
            return index === 0
              ? `s${setNum}.quantity IS NOT NULL`
              : `or s${setNum}.quantity IS NOT NULL`;
          })
          .join(" ")}
      ) and (          
        ${legoSetNumbers
          .map((setNum, index) => {
            return index === 0
              ? `s${setNum}.lego_set_id = ?`
              : `or s${setNum}.lego_set_id = ?`;
          })
          .join(" ")}
      )
    `;
};

// example
// s7675.quantity as set_7675_q,
// s7676.quantity as set_7676_q,
// s10195.quantity as set_10195_q,
// (
//     ifnull(s7675.quantity, 0) + ifnull(s7676.quantity, 0) + ifnull(s10195.quantity, 0)
// ) as total_q,
// s7675.lego_set_id,
// s7676.lego_set_id,
// s10195.lego_set_id,

const bbSelect = (legoSetNumbers: any[]) => {
  return `
      
        ${legoSetNumbers
          .map((setNum) => {
            return `s${setNum}.quantity as set_${setNum}_q,
                    s${setNum}.quantity_build_in as set_${setNum}_q_build_in,   `;
          })
          .join(" ")}

        (

            ${legoSetNumbers
              .map((setNum, index) => {
                return index === 0
                  ? `ifnull(s${setNum}.quantity, 0)`
                  : `+ ifnull(s${setNum}.quantity, 0)`;
              })
              .join(" ")}
        ) as q_total_needed,


        (

          ${legoSetNumbers
            .map((setNum, index) => {
              return index === 0
                ? `ifnull(s${setNum}.quantity_build_in, 0)`
                : `+ ifnull(s${setNum}.quantity_build_in, 0)`;
            })
            .join(" ")}
      ) as sum_quantity_build_in,
     
        ${legoSetNumbers
          .map((setNum) => {
            return `s${setNum}.lego_set_id,`;
          })
          .join(" ")}
    `;
};



export default {
  bbLeftJoin,
  bbWhere,
  bbSelect
}