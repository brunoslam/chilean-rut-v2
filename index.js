Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChileanRut = function () {
	function ChileanRut() {
		_classCallCheck(this, ChileanRut);
	}

	_createClass(ChileanRut, [{
		key: 'formatOnKeyPress',
		value: function formatOnKeyPress(selector) {
			//document.getElementById("")
			var input = document.querySelector(selector);
			input.addEventListener('keyup', function(e){
				if (input.value.indexOf('-') > -1) {
					var dv = input.value.split("-")
				}
				input.value = this.format(input.value);
			});
		}
	},
	{
		key: 'formatOnChange',
		value: function formatOnChange(selector) {
			//document.getElementById("")
			var input = document.querySelector(selector);

			input.addEventListener("change", function(e) {
				/*if(input.value.indexOf('-') > -1){

					input.value = this.format(input.value.split("-")[0], input.value.split("-")[1]);	
				}else{*/
				input.value = this.format(input.value);
				//}

			});
		}
	}, {
		key: 'format',
		value: function format(Rut, digitoVerificador) {
			var sRut = Rut.toString();
			var sRutFormateado = '';

			sRut = this.unformat(sRut);
			/*if(digitoVerificador){
				var rutMilificado = sRut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				sRutFormateado = `${rutMilificado}-${digitoVerificador}`;
			}else */
			if (sRut.length > 1) {
				var xdRut = sRut.substring(0, sRut.length - 1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				var xdDv = sRut.substring(sRut.length - 1, sRut.length);
				sRutFormateado = xdRut+xdDv;
			}

			return sRutFormateado;
		}
	}, {
		key: 'unformat',
		value: function unformat(rut) {
			var strRut = rut.toString();

			while (strRut.indexOf('.') !== -1) {
				strRut = strRut.replace('.', '');
			}
			/*while (strRut.indexOf('-') !== -1) {
				strRut = strRut.replace('-', '');
			}*/

			return strRut;
		}
	}, {
		key: 'validValidatorDigit',
		value: function validValidatorDigit(dv) {
			if (dv !== '0' && dv !== '1' && dv !== '2' && dv !== '3' && dv !== '4' && dv !== '5' && dv !== '6' && dv !== '7' && dv !== '8' && dv !== '9' && dv !== 'k' && dv !== 'K') {
				return false;
			}
			return true;
		}
	}, {
		key: 'correctValidatorDigit',
		value: function correctValidatorDigit(crut) {
			var largo = crut.length;
			var rut = null;
			var dv = crut.charAt(largo - 1);

			if (largo < 2) {
				return false;
			}
			if (largo > 2) {
				rut = crut.substring(0, largo - 1);
			} else {
				rut = crut.charAt(0);
			}

			this.validValidatorDigit(dv);

			if (rut === null || dv === null) {
				return 0;
			}

			var dvr = this.getValidatorDigit(rut);

			if (dvr.toString() !== dv.toLowerCase()) {
				return false;
			}
			return true;
		}
	}, {
		key: 'getValidatorDigit',
		value: function getValidatorDigit(rut) {
			var dvr = '0';
			var suma = 0;
			var mul = 2;
			var i = 0;
			var res = 0;

			for (i = rut.length - 1; i >= 0; i = i - 1) {
				suma = suma + rut.charAt(i) * mul;
				if (mul === 7) {
					mul = 2;
				} else {
					mul = mul + 1;
				}
			}
			res = suma % 11;
			if (res === 1) {
				return 'k';
			} else if (res === 0) {
				return '0';
			} else {
				return 11 - res;
			}
		}
	}, {
		key: 'validate',
		value: function validate(_texto) {
			var texto = this.unformat(_texto);
			var largo = texto.length;
			var i = 0;
			var j = 0;
			var invertido = '';
			var dtexto = '';
			var cnt = 0;

			// rut muy corto
			if (largo < 2) {
				return false;
			}

			// verifica que los numeros correspondan a los de rut
			for (i = 0; i < largo; i = i + 1) {
				// numero o letra que no corresponda a los del rut
				if (!this.validValidatorDigit(texto.charAt(i))) {
					return false;
				}
			}

			for (i = largo - 1, j = 0; i >= 0; i = i - 1, j = j + 1) {
				invertido = invertido + texto.charAt(i);
			}
			dtexto = dtexto + invertido.charAt(0);
			dtexto = dtexto + '-';

			for (i = 1, j = 2; i < largo; i = i + 1, j = j + 1) {
				if (cnt === 3) {
					dtexto = dtexto + '.';
					j = j + 1;
					dtexto = dtexto + invertido.charAt(i);
					cnt = 1;
				} else {
					dtexto = dtexto + invertido.charAt(i);
					cnt = cnt + 1;
				}
			}

			invertido = '';

			for (i = dtexto.length - 1, j = 0; i >= 0; i = i - 1, j = j + 1) {
				invertido = invertido + dtexto.charAt(i);
			}

			if (this.correctValidatorDigit(texto)) {
				return true;
			}
			return false;
		}
	}]);

	return ChileanRut;
}();

module.exports = new ChileanRut();