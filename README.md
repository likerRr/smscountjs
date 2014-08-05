### What is *smscountjs*?
It provides you some ways to obtain sms count and characters left via provided text string

### Why i need it?
Sometimes may be useful to integrate into your project sms newsletter. So, once you've done it, it would be nice to have some hints (for those who will write sms text) such as total sms count and character left to next sms. At this point you need **smscountjs**

### How can i use it?
Just include `smscount.min.js` to your html document, create `SMS` instance and call `count` method or use `smsCount` method of `String` object

### Examples, examples!
Let's see, how it works by first way:

	var sms = SMS(), // also you can use `new` keyword
		text = 'Hello, world! This is a simple example of how to use `smscountjs` to calculate ' +
			'current total sms count and characters left to next sms. SMS in latin may contain ' +
			'160 characters per SMS';

    sms.count(text, function(totalCount, charsLeft, source) {
		console.log('total: ' + totalCount); // total sms count
		console.log('left: ' + charsLeft); // characters left to next sms
		console.log(parts); // source text separated by SMS limitation
    });

Code above will output:
![This image][1]

If you prefer to use `smscount` directly with String, just make same:

	var text = 'Hello, world! This is a simple example of how to use `smscountjs` to calculate ' +
		'current total sms count and characters left to next sms. SMS in latin may contain ' +
		'160 characters per SMS';

	text.smsCount(function(totalCount, charsLeft, parts) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log(parts)
	});
	// output will be the same as above
See? It's pretty simple!

### How about UTF-16?
As known, SMS protocol can send only 160 bytes of data. Currently `smscount` may work with latin (160 symbols) and cyrillic (70 sybmols). Be free to use both latin and cyrillic encoding

### Configuration
You can configure limit for latin and cyrillic encoding, by passing options object to SMS constructor:

 	var sms = SMS({
			latin: 50,
			cyrillic: 20
		}),
		text = 'Hello, world! This is a simple example of how to use `smscountjs` to calculate ' +
			'current total sms count and characters left to next sms. SMS in latin may contain ' +
			'160 characters per SMS';

	sms.count(text, function(totalCount, charsLeft, parts) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log(parts)
	});
Code above will output:
![enter image description here][2]

To configure call from String object, pass options object as first parameter and callback as second:

	var text = 'Hello, world! This is a simple example of how to use `smscountjs` to calculate ' +
		'current total sms count and characters left to next sms. SMS in latin may contain ' +
		'160 characters per SMS';

	text.smsCount({
		latin: 50,
		cyrillic: 20
	}, function(totalCount, charsLeft, parts) {
		console.log('total: ' + totalCount);
		console.log('left: ' + charsLeft);
		console.log(parts)
	});
	// output will be the same as above

Thats all, again pretty simple, yeah?

### License
Under MIT license (http://www.opensource.org/licenses/mit-license.php)


  [1]: http://clip2net.com/clip/m182888/1407244798-bc3e6-8kb.png?nocache=1
  [2]: http://clip2net.com/clip/m182888/1407248152-7a06b-12kb.png?nocache=1