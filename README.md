### What is *smscountjs*?
This javascript plugin provides you some ways to obtain sms count and characters left via provided text string

### Why i need it?
Sometimes may be useful to integrate into your project sms newsletter. So, once you've done it, it would be nice to have some hints (for those who will write sms text) such as total sms count and character left to next sms. At this point you need **smscountjs**

### How can i use it?
Just include `smscount.min.js` to your html document, create `SMS` instance and call `count` method or use `smsCount` method of `String` object

### Is it stable?
Current version is `1.0`, it's stable and include these features:

 - Usage from `new instance` or `String` prototype
 - Returns `limit`, `smsCout`, `charsLeft`, `parts` from inputed text in callback or as object
 - configure 7-bit, 8-bit, 16-bit character set length limit
 - Has 4 methods to get sms text parameters: `charsLeft()`,  `total()`, `limit()`, `parts()`

### Basic usage
Let's see, how it works by object oriented way:

    var sms = SMS(),// also you can use "new" keyword
		text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain up to 160 characters per SMS';

	sms.count(text, function(totalCount, charsLeft, parts, limit) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log('limit: ' + limit);
		console.log(parts);
		// get full message length
		console.log('length: ' + parts.join('').length);
		// get full message
		console.log('message: ' + parts.join(''));
	});

Code above will output:
![Output_1][1]

If you prefer to use `smscount` directly with String object, just make same:

	var text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain up to 160 characters per SMS';

	text.smsCount(function(totalCount, charsLeft, parts, limit) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log('limit: ' + limit);
		console.log(parts);
		// get full message length
		console.log('length: ' + parts.join('').length);
		// get full message
		console.log('message: ' + parts.join(''));
	});
	// output will be the same as above
	
To get counted data not in callback function, you can simply skip second parameter, in this case method will return object with the same fields: 

 	var sms = SMS(),// also you can use "new" keyword
		text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain up to 160 characters per SMS';

	console.log(sms.count(text));

![Output_5][5]
See? It's pretty simple!

### How about UTF-16?
`smscount` perfectly recognize 7-bit (latin), 8-bit (frehcn and german specific symbols) and 16-bit (cyrillic) charset according to [GSM 03.38][2]. Just put string with your encoding and get results. Also it works with mixed encodings (shortest limit will be used in this case):

	var latinText = 'to have fun without stopping',
		frenchText = 's\'amuser sans arrêt',
		cyrillicText = 'веселиться без остановки',
		mixedText = latinText + ', ' + frenchText + ', ' + cyrillicText;

	latinText.smsCount(function(totalCount, charsLeft, parts, limit) {
		console.log('limit: ' + limit);
	});
	frenchText.smsCount(function(totalCount, charsLeft, parts, limit) {
		console.log('limit: ' + limit);
	});
	cyrillicText.smsCount(function(totalCount, charsLeft, parts, limit) {
		console.log('limit: ' + limit);
	});
	mixedText.smsCount(function(totalCount, charsLeft, parts, limit) {
		console.log('limit: ' + limit);
	});
Code above will output:
![Output_4][4]

### Methods
`smscount` has some methods, available only from object oriented uasge:

 - *int* charsLeft() - returns characters left to next sms
 - *int* limit() - limit applied to string
 - *int* total() - total sms count
 - *array* parts() - parts of sms message, separated by limit

In action:

	var sms = SMS(),  // also you can use "new" keyword
		text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain up to 160 characters per SMS';

	sms.count(text);
	console.log('left: ' + sms.charsLeft());
	console.log('limit: ' + sms.limit());
	console.log('total: ' + sms.total());
	console.log(sms.parts());

### Configuration
You can configure limit according to 7-bit, 8-bit, 16-bit encoding, by passing options object to SMS constructor:

	var sms = SMS({
			_7bit: 50
		}),// also you can use "new" keyword
		text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain up to 160 characters per SMS';

	sms.count(text, function(totalCount, charsLeft, parts, limit) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log('limit: ' + limit);
		console.log(parts);
		// get full message length
		console.log('length: ' + parts.join('').length);
		// get full message
		console.log('message: ' + parts.join(''));
	});
Code above will output:
![Output_3][3]

To configure call from String object, pass options object as first parameter and callback as second parameter:

	var text = 'Hello, world! This is a simple example of how to use "smscountjs" to calculate current total sms count and characters left to next sms. SMS in latin may contain 160 characters per SMS';
		
	text.smsCount({
		_7bit: 50
	}, function(totalCount, charsLeft, parts) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log(parts)
	});
	// output will be the same as above

Thats all, again pretty simple, yeah?

### References

 - [SMS description](https://en.wikipedia.org/wiki/SMS)
 - [GSM 03.38 character set](http://en.wikipedia.org/wiki/GSM_03.38)
 - [ASCII table for languages](http://webdesign.about.com/od/localization/l/blhtmlcodes-fr.htm)
 - [How to count character by byte length (ru)](http://www.epochta.ru/knowledgebase/articles/sms-long.html)

### License
Under MIT license (http://www.opensource.org/licenses/mit-license.php)


  [1]: https://github.com/likerRr/smscountjs/blob/master/docs/images/1.png
  [2]: http://en.wikipedia.org/wiki/GSM_03.38
  [3]: https://github.com/likerRr/smscountjs/blob/master/docs/images/2.png
  [4]: https://github.com/likerRr/smscountjs/blob/master/docs/images/3.png
  [5]: https://github.com/likerRr/smscountjs/blob/master/docs/images/4.png


