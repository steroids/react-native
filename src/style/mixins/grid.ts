// import { mixinBorderRadius } from './border-radius';

export const mixinMakeContainer = (
    variables,
    none, // :P
) => (variables.enableGridClasses ? {
    width: '100%',
    paddingRight: variables.gridGutterWidth / 2,
    paddingLeft: variables.gridGutterWidth / 2,
    marginRight: 'auto',
    marginLeft: 'auto',
} : {});

// // For each breakpoint, define the maximum width of the container in a media query
// @mixin make-container-max-widths($max-widths: $container-max-widths, $breakpoints: $grid-breakpoints) {
//   @each $breakpoint, $container-max-width in $max-widths {
//     @include media-breakpoint-up($breakpoint, $breakpoints) {
//       max-width: $container-max-width;
//     }
//   }
// }

// @mixin make-row() {
//   display: flex;
//   flex-wrap: wrap;
//   margin-right: ($grid-gutter-width / -2);
//   margin-left: ($grid-gutter-width / -2);
// }

// @mixin make-col-ready() {
//   position: relative;
//   // Prevent columns from becoming too narrow when at smaller grid tiers by
//   // always setting `width: 100%;`. This works because we use `flex` values
//   // later on to override this initial width.
//   width: 100%;
//   min-height: 1px; // Prevent collapsing
//   padding-right: ($grid-gutter-width / 2);
//   padding-left: ($grid-gutter-width / 2);
// }

// @mixin make-col($size, $columns: $grid-columns) {
//   flex: 0 0 percentage($size / $columns);
//   // Add a `max-width` to ensure content within each column does not blow out
//   // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
//   // do not appear to require this.
//   max-width: percentage($size / $columns);
// }

// @mixin make-col-offset($size, $columns: $grid-columns) {
//   $num: $size / $columns;
//   margin-left: if($num == 0, 0, percentage($num));
// }