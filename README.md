# Input Number
Simple jQuery plugin to add plus and minus controls to an input element
## Installation
Installation can be done through bower
```
bower install develo-input-number --save
```
Then add the script and jQuery to your page.

## Example Usage
```
// Default options, feel free to override them.
var options = {

	// Style customisations
	className: 'develo-quantity-helper',
	buttonClassName: 'button',
	
	// Min and max
	max: null,
	min: null,
	
	// Plus and minus buttons. Supports html
	minusHtml: '-',
	plusHtml: '+',

	// Callbacks
	onDecreased: function( value ){},
	onIncreased: function( value ){}
};

$( 'input' ).develoInputNumber();
```
