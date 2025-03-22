// ==UserScript==
// @name         NexusMods Extended
// @namespace    https://www.nexusmods.com/
// @version      1.0.1
// @description  Extends page settings and adds utilites
// @author       Toestub
// @match        https://www.nexusmods.com/*
// @icon         https://www.nexusmods.com/favicon.ico
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @downloadURL  https://github.com/ShadowEXE492/tampermonkey-scripts/raw/refs/heads/main/NexusMods%20Extended%20Options.user.js
// @updateURL    https://github.com/ShadowEXE492/tampermonkey-scripts/raw/refs/heads/main/NexusMods%20Extended%20Options.user.js
// ==/UserScript==

(() => {
    var autoRBlur = GM_getValue("rBlur", false);
    var extendPage = GM_getValue("extend_page", false);
    console.log("Auto Remove Blur: " + autoRBlur);


    //create settings menu
    //menu button
    const settingsButton = document.createElement('div');
    const settingsButtonBackground = document.createElement('div');
    const settingsButtonIcon = document.createElement('i');
    settingsButton.classList = "nav-interact rj-settings-extended";
    settingsButtonBackground.classList = "ni-background";
    settingsButtonIcon.classList = "material-icons";
    settingsButtonIcon.textContent = "tune";
    settingsButton.appendChild(settingsButtonBackground);
    settingsButton.appendChild(settingsButtonIcon);
    $('.nav-interact-buttons')[0].appendChild(settingsButton);

    //menu panel
    const settingsTray = document.createElement('div');
    const settingsTrayContent = document.createElement('ul');
    settingsTray.classList = "rj-right-tray rj-settings-extended-tray";
    settingsTrayContent.classList = "rj-right-tray-content rj-settings-extended-tray-content";
    settingsTray.appendChild(settingsTrayContent);
    document.getElementById('head').appendChild(settingsTray);
    GM_addStyle(".rj-notifications-tray .arrow { right: 150px }");
    GM_addStyle(".rj-settings-extended-tray { height: 0px; border-radius: 4px; overflow: hidden; }");
    GM_addStyle(".rj-settings-extended-tray-content { min-width: 208px; max-width: 288px; border-radius: 4px; background-color: var(--colour-surface-mid); border: solid 1px var(--colour-stroke-weak); }");

    $('.rj-settings-extended').click(ExtendedSettings);
    $('.rj-notifications').click(function() { hideExtendedSettingsTray() });
    $('.rj-profile').click(function() { hideExtendedSettingsTray() });

    const s = $(".rj-settings-extended-tray");
    function ExtendedSettings() {
        s.hasClass("rj-open") ? hideExtendedSettingsTray() : showExtendedSettingsTray();
    }

    function hideExtendedSettingsTray() {
        setTimeout(function () {
            s.removeClass("rj-open");
            s.css("height", "");
        }, 0);
    }

    function showExtendedSettingsTray() {
        setTimeout(function() {
            const a = $(".rj-notifications-tray");
            a.removeClass("rj-open");
            a.css("height", "");
            $(".notification-menu").removeClass("show");
        }, 250);
        setTimeout(function() {
            const g = $(".rj-profile-tray");
            g.removeClass("rj-open");
            g.css("height", "");
        }, 250);
        setTimeout(function() {
            s.addClass("rj-open");
            s.css("height", "auto");
        }, 0);
    }

    $('.rj-settings-extended-tray-content').append("<li><div class=\"section-content\"><div class=\"user-profile-menu-username\">Extended Settings</div></div></li>");
    GM_addStyle(".settings-extended-title {font-size: 16px; font-weight: 700; line-height-24px; color: var(--colour-neutral-moderate); text-align: center;}");
    GM_addStyle(".rj-settings-extended-tray-content .section-content {display: flex; font-size: 16, column-gap:12px; line-height: 1.5; font-weight: 400; letter-spacing: 0; padding: 10px 16px; align-items: center; color: var(--colour-neutral-moderate)}");

    //Extend Page Toggle
    GM_registerMenuCommand("Extend Page Width: " + extendPage, function() { GM_setValue("extend_page", !extendPage); document.location.reload(); });

    //Remove NSFW blur toggle
    GM_registerMenuCommand("Auto Remove Blur: " + autoRBlur, function() { GM_setValue("rBlur", !autoRBlur); document.location.reload(); });



    if (extendPage) {
        GM_addStyle("@media (min-width: 1920px) { .next-container { width: 1920px; }}");
        GM_addStyle("@media (min-width: 1920px) { .wrapper { max-width: 1920px; }}");
    }

    const list = document.getElementsByClassName("modactions clearfix")[0];
    if (list && !autoRBlur) {
        const newNode = document.createElement("li");
        const buttonNode = document.createElement("button");
        buttonNode.classList.add("btn", "inline-flex");
        buttonNode.textContent = "Remove Blur";
        newNode.appendChild(buttonNode);
        newNode.id = "remove-blur";

        list.insertBefore(newNode, list.children[0]);

        buttonNode.addEventListener("click", removeBlurStart);
    }
    else if (autoRBlur) {
        removeBlurStart()
    }

    function removeBlurStart(){
        GM_addStyle(".blur-image img { filter: blur(0px) } .blur-image-sm img { filter: blur(0px) } .unblur-btn { visibility: hidden; } .blur-xl { filter: blur(0px); }");
        $('.mod_adult_warning_wrapper').remove();
        $('.mod_description_container.blur-description').removeClass('blur-description');
    }


})();