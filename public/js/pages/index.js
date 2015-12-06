var regexp = /(?:\$\$\$)([a-zA-z][^\s\$\$]+)(?:\$\$\$)/g;
var fruititemhtml = $('#fruitcaritem').html().replace(/\\/g, '');
var fruittemplate = Handlebars.compile(fruititemhtml);


