/**
 * Simple jQuery plugin that adds buttons either side of the input to increase and decrease the quantity
 *
 * @author      paul@develo
 * @package     develo-input-number
 * @date        21/05/15
 */
+function( $ ) {

	'use strict';

	/**
	 * @param $el object containing "jQuerified" element
	 * @param options object
	 * @constructor
	 */
	var Input = function( $el, options ){

		this.options = $.extend( {

			className: 'develo-quantity-helper',
			buttonClassName: 'button',
			disabledClassName: 'disabled',
			max: null,
			min: null,
			minusHtml: '-',
			plusHtml: '+',

			onDecreased: function( value ){},
			onIncreased: function( value ){},
			getInput: $el

		}, options );

		this.$input = $el;

		this.render();
		this.setupBindings();
	};

	/**
	 * Add the correct class and add the buttons to the element
	 */
	Input.prototype.render = function(){

		this.$el = $( '<div/>' )
			.addClass( this.options.className )
			.insertBefore( this.$input );

		this.$minus = $( '<a href="#"/>' )
			.data( 'action', 'decrease' )
			.html( this.options.minusHtml )
			.addClass( this.options.buttonClassName )
			.addClass( this.options.disabledClassName );

		this.$plus = $( '<a href="#"/>' )
			.data( 'action', 'increase' )
			.html( this.options.plusHtml )
			.addClass( this.options.buttonClassName );

		this.$el.append( this.$minus, this.$input, this.$plus );
	};

	/**
	 * Setup our bindings
	 */
	Input.prototype.setupBindings = function(){

		this.$minus.on( 'click', $.proxy( this.onButtonPress, this ) );
		this.$plus.on( 'click', $.proxy( this.onButtonPress, this ) );
	};

	/**
	 * Called when a button has been pressed
	 */
	Input.prototype.onButtonPress = function( event ){

		event.preventDefault();

		var action = $( event.currentTarget ).data( 'action' );

		action == 'increase' ?
			this.increase():
			this.decrease();
	};

	/**
	 * Increase the value by one
	 */
	Input.prototype.increase = function(){

		this.set( this.get() +1 );
		this.options.onIncreased( this.get() );
	};

	/**
	 * Decrease the value by one
	 */
	Input.prototype.decrease = function(){

		this.set( this.get() -1 );
		this.options.onDecreased( this.get() );
	};

	/**
	 * Get the input value
	 *
	 * @returns {number}
	 */
	Input.prototype.get = function(){

		return parseInt( this.$input.val() );
	};

	/**
	 * Set the input value
	 * - Ensure the value is greater than the min
	 * - Ensure the new value is not larger max
	 *
	 * @param value
	 */
	Input.prototype.set = function( value ){

		if( this.options.min != null && value <= this.options.min ) {
			value = this.options.min;
			this.$minus.addClass(this.options.disabledClassName);
		} else {
			this.$minus.removeClass(this.options.disabledClassName);
		}

		if( this.options.max && value > this.options.max ) {
			value = this.options.max;
			this.$plus.addClass(this.options.disabledClassName);
		} else {
			this.$plus.removeClass(this.options.disabledClassName);
		}

		this.$input.val( value );
		this.$input.trigger( 'change' );
	};


	/**
	 * Create the jQuery plugin.
	 *
	 * @param options
	 */
	$.fn.develoQuantityHelper = function( options ){

		this.each( function(){

			var $el = $( this );

			if( ! $el.data( 'develoInputNumber' ) ){
				$el.data( 'develoInputNumber', new Input( $el, options ) );
			}
		});

		return this;
	};

}(jQuery);