// TRRS-PJ-320A-dual
//
// Normal footprint:
//     _________________
//    |   (2)   (3) (4)|
//    |                |
//    | (1)            |
//    |________________|
// 
// Reverse footprint:
//     _________________
//    |   (2)   (3) (4)|
//    | (1)            |
//    | (1)            |
//    |___(2)___(3)_(4)|
//
// Reverse & symmetric footprint:
//     _________________
//    | (1|2)   (3) (4)|
//    |                |
//    |_(1|2)___(3)_(4)|
//
// Nets
//    A: corresponds to pin 1
//    B: corresponds to pin 2
//    C: corresponds to pin 3
//    D: corresponds to pin 4
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    symmetric: default is false
//      if true, will only work if reverse is also true
//      this will cause the footprint to be symmetrical on each half
//      pins 1 and 2 must be identical if symmetric is true, as they will overlap

module.exports = {
  params: {
    designator: 'USBC',
    reverse: false,
    symmetric: false,
    A: undefined,
    B: undefined,
    C: undefined,
    D: undefined
  },
  body: p => {
    const standard = `
      (module TRRS-PJ-320A-dual (layer F.Cu) (tedit 5970F8E5)

      ${p.at /* parametric position */}   

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 14.2) (layer Dwgs.User) (effects (font (size 1 1) (thickness 0.15))))
      (fp_text value TRRS-PJ-320A-dual (at 0 -5.6) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start 4.62 0) (end 4.62 6.7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 4.62 6.7) (end -4.62 6.7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -4.62 6.7) (end -4.62 0) (layer Dwgs.User) (width 0.15))

      `
      function stabilizer_back(x, y) {
      return `
        (pad "" thru_hole oval (at ${x} ${y}) (size 1.0 1.8) (drill oval 0.6 1.4) (layers *.Cu *.Mask))
      `
    }
       
      function stabilizer_front(x, y) {
      return `
        (pad "" thru_hole oval (at ${x} ${y}) (size 1.0 2.2) (drill oval 0.6 1.8) (layers *.Cu *.Mask))
      `
    }

      function pin(pad_n, x, y, w) {
      return `
        (pad pad_n smd rect (at ${x} ${y} ${p.rot}) (size ${w} 1.1) (layers *.Cu *.Mask) ${p.A.str})
      `
    }

    return `
      ${standard}
      ${stabilizer_back('5.62', '6.1')}
      ${stabilizer_back('-5.62', '6.1')}
      ${stabilizer_front('5.62', '2.1')}
      ${stabilizer_front('-5.62', '2.1')}

      ${pin(1, '2.40', '7.25', '0.6')}
      ${pin(2, '3.20', '7.25', '0.6')}

      ${pin(3, '1.75', '7.25', '0.3')}
      ${pin(4, '1.25', '7.25', '0.3')}
      ${pin(5, '0.75', '7.25', '0.3')}
      ${pin(5, '0.25', '7.25', '0.3')}
      ${pin(6, '-1.75', '7.25', '0.3')}
      ${pin(7, '-1.25', '7.25', '0.3')}
      ${pin(8, '-0.75', '7.25', '0.3')}
      ${pin(9, '-0.25', '7.25', '0.3')}

      ${pin(10, '-2.40', '7.25', '0.6')}
      ${pin(11, '-3.20', '7.25', '0.6')}
`

  }
}
