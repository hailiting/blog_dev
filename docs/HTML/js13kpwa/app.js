// Generating content based on the template
var template = "<article>\n\
	<img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
	<h3>#POS. NAME</h3>\n\
	<ul>\n\
	<li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
	<li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
	<li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
	<li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
	<li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
	</ul>\n\
</article>";
var content = '';
for (var i = 0; i < games.length; i++) {
	var entry = template.replace(/POS/g, (i + 1))
		.replace(/SLUG/g, games[i].slug)
		.replace(/NAME/g, games[i].name)
		.replace(/AUTHOR/g, games[i].author)
		.replace(/TWITTER/g, games[i].twitter)
		.replace(/WEBSITE/g, games[i].website)
		.replace(/GITHUB/g, games[i].github);
	entry = entry.replace('<a href=\'http:///\'></a>', '-');
	content += entry;
};
document.getElementById('content').innerHTML = content;
// registering service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/js13kpwa/sw.js");
}
// requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener("click", function (e) {
	// Notification.permission: default(未做出选择) || granted(用户授权了) || denied(用户拒绝了)
	if (!("Notification" in window)) {
		alert("浏览器不支持")
		return;
	} else if (Notification.permission === "granted") {
		randomNotification();
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (result) {
			if (result === "granted") {
				randomNotification();
			}
		})
	}
})
function randomNotification() {
	var randomItem = Math.floor(Math.random() * games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = "Created by " + games[randomItem].author + ".";
	var notifImg = "data/img/" + games[randomItem].slug + ".jpg";
	var options = {
		body: notifBody,
		icon: notifImg,
		dir: "auto", // auto(自动) ltr(从左到右) rtl(从右到左)
		lang: "zh",
		tag: "testTag", // 赋予通知ID，以便对通知进行刷新、替换或移除
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 3000);
};
var imagesToLoad = document.querySelectorAll("img[data-src]");
var loadImages = function (image) {
	image.setAttribute("src", image.getAttribute("data-src"));
	image.onload = function () {
		image.removeAttribute("data-src");
	}
}
if ("IntersectionObserver" in window) {
	var observer = new IntersectionObserver(function (items, observer) {
		items.forEach(function (item) {
			if (item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		})
	})
	imagesToLoad.forEach(function (img) {
		observer.observe(img);
	})
} else {
	imagesToLoad.forEach(function (img) {
		loadImages(img);
	})
}