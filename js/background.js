chrome.commands.onCommand.addListener(function(command) {
    let cmd = command;
    switch (cmd) {
        case 'clipboard-key':
            getYoutubeUrl();
            break;
    }

});
var textToPutOnClipboard = "some text which should appear in clipboard";

function getYoutubeUrl() {
    let activeTab;
    console.log('mustCopy');
    chrome.tabs.query({ windowType: "normal" }, function(tabs) {
        for (let i = tabs.length - 1; i >= 0; i--) {
            if (tabs[i].url.startsWith("https://www.youtube.com/watch")) {
                activeTab = tabs[i].id;
                textToPutOnClipboard = tabs[i].url;
                document.execCommand('copy');
                break;
            }
        }
    });
}
document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', textToPutOnClipboard);
    e.preventDefault();
});
chrome.browserAction.onClicked.addListener(function(tab) {
    getYoutubeUrl();
});