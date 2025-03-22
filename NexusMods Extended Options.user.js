// ==UserScript==
// @name         NexusMods Extended
// @namespace    https://www.nexusmods.com/
// @version      1.0.1
// @description  Extends page settings and adds utilites
// @author       Toestub
// @match        https://www.nexusmods.com/*
// @icon         https://www.nexusmods.com/favicon.ico
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @downloadURL  https://github.com/ShadowEXE492/tampermonkey-scripts/raw/refs/heads/main/NexusMods%20Extended%20Options.user.js
// @updateURL    https://github.com/ShadowEXE492/tampermonkey-scripts/raw/refs/heads/main/NexusMods%20Extended%20Options.user.js
// ==/UserScript==

(() => {
    $.noConflict();
    jQuery(document).ready(function ($) {
        var autoRBlur = GM_getValue("rBlur", false);
        var extendPage = GM_getValue("extend_page", false);

        extend_page();
        remove_blur();

        
        if ($(".nav-interact-buttons") != null) {
            const settingsButton = document.createElement("div");
            const settingsButtonBackground = document.createElement("div");
            const settingsButtonIcon = document.createElement("i");
            settingsButton.classList = "nav-interact rj-settings-extended";
            settingsButtonBackground.classList = "ni-background";
            settingsButtonIcon.classList = "material-icons no-select";
            settingsButtonIcon.textContent = "tune";
            settingsButton.appendChild(settingsButtonBackground);
            settingsButton.appendChild(settingsButtonIcon);
            $(".nav-interact-buttons")[0].appendChild(settingsButton);
        }
        else if ($('.lg\\:gap-x-2') != null) {

        }
        //create settings menu
        //menu button
        

        //menu panel
        const settingsTray = document.createElement("div");
        const settingsTrayContent = document.createElement("ul");
        settingsTray.classList = "rj-right-tray rj-settings-extended-tray";
        settingsTrayContent.classList = "rj-right-tray-content rj-settings-extended-tray-content";
        settingsTray.appendChild(settingsTrayContent);
        document.getElementById("head").appendChild(settingsTray);
        GM_addStyle(".rj-notifications-tray .arrow { right: 150px }");
        GM_addStyle(
            ".rj-settings-extended-tray { height: 0px; border-radius: 4px; overflow: hidden; }"
        );
        GM_addStyle(
            ".rj-settings-extended-tray-content { min-width: 208px; max-width: 288px; border-radius: 4px; background-color: var(--colour-surface-mid); border: solid 1px var(--colour-stroke-weak); }"
        );

        $(".rj-settings-extended").click(ExtendedSettings);
        $(".rj-notifications").click(function () {
            hideExtendedSettingsTray();
        });
        $(".rj-profile").click(function () {
            hideExtendedSettingsTray();
        });
        $("body").click(function () {
            hideExtendedSettingsTray();
        });

        const s = $(".rj-settings-extended-tray");
        function ExtendedSettings() {
            s.hasClass("rj-open")
                ? hideExtendedSettingsTray()
                : showExtendedSettingsTray();
        }

        function hideExtendedSettingsTray() {
            setTimeout(function () {
                s.removeClass("rj-open");
                s.css("height", "");
            }, 0);
        }

        function showExtendedSettingsTray() {
            setTimeout(function () {
                const a = $(".rj-notifications-tray");
                a.removeClass("rj-open");
                a.css("height", "");
                $(".notification-menu").removeClass("show");
            }, 250);
            setTimeout(function () {
                const g = $(".rj-profile-tray");
                g.removeClass("rj-open");
                g.css("height", "");
            }, 250);
            setTimeout(function () {
                s.addClass("rj-open");
                s.css("height", "auto");
            }, 0);
        }

        GM_addStyle(
            ".settings-extended-title {font-size: 16px; font-weight: 700; line-height-24px; color: var(--colour-neutral-moderate); text-align: center;}"
        );
        GM_addStyle(
            ".rj-settings-extended-tray-content .section-content {display: flex; font-size: 16; column-gap: 12px; line-height: 1.5; font-weight: 400; letter-spacing: 0; padding: 10px 16px; align-items: center; color: var(--colour-neutral-moderate)}"
        );
        GM_addStyle(
            ".no-select {-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}"
        );
        GM_addStyle(".setting-interact {cursor: pointer;}");

        GM_addStyle(
            ".wrapper-wide { max-width: 1920px; } @media (min-width: 1920px) { .next-container-wide { width: 1920px }}"
        );
        GM_addStyle(
            ".blur-image-override img { filter: blur(0px) } .hide { visibility: hidden }"
        );


        $(".rj-settings-extended-tray-content").append(
            '<li><div class="section-content"><i class="material-icons no-select">tune</i><div class="settings-extended-title">Extended Settings</div></div></li><li class="user-profile-menu-divider"></li>'
        );

        $(".rj-settings-extended-tray-content").append(createToggle("Extend Page Width", "extend-page-width", extendPage));
        $("#extend-page-width").click(function () {extend_page_func($("#extend-page-width .material-icons")[0]);});

        $(".rj-settings-extended-tray-content").append(createToggle("Toggle Hide Blur", "toggle-hide-blur", autoRBlur));
        $("#toggle-hide-blur").click(function() {toggle_hide_blur($("#toggle-hide-blur .material-icons")[0])});

        /**
         * @param {String} text Text for the setting
         * @param {String} id id to call for click
         * @param {Boolean} enabled whether toggle should be enabled or not
         */
        function createToggle(text, id, enabled) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const div = document.createElement("div");
            const icon = document.createElement("i");

            div.classList = "section-content noselect";
            icon.classList = "material-icons noselect";
            icon.innerText = flipToggle(enabled);
            a.classList = "setting-interact";
            a.id = id;

            li.append(a);
            a.append(div);
            div.append(icon);
            div.append(text);
            console.log(text);

            return li;
        }

        function flipToggle(variable) {
            if (variable) {
                return "check_box";
            } else {
                return "check_box_outline_blank";
            }
        }

        /**
         * @param {Boolean} toggle the element that contains the toggle icon
         */
        function extend_page_func(toggle) {
            extendPage = !extendPage;
            GM_setValue("extend_page", extendPage);
            extend_page();
            toggle.innerText = flipToggle(extendPage);
        }

        function extend_page() {
            if (extendPage) {
                $(".wrapper").addClass("wrapper-wide");
                $(".next-container").addClass("next-container-wide");
                //GM_addStyle("@media (min-width: 1920px) { .next-container { width: 1920px; }}");
                //GM_addStyle("@media (min-width: 1920px) { .wrapper { max-width: 1920px; }}");
            } else {
                $(".wrapper-wide").removeClass("wrapper-wide");
                $(".next-container-wide").removeClass("next-container-wide");
            }
        }

        function toggle_hide_blur(toggle) {
            autoRBlur = !autoRBlur;
            GM_setValue("rBlur", autoRBlur);
            remove_blur();
            toggle.innerText = flipToggle(autoRBlur);
        }

        function remove_blur() {
            if (autoRBlur) {
                $(".mod_adult_warning_wrapper").addClass("hide");
                $(".mod_description_container.blur-description").removeClass("blur-description");
                GM_addStyle(".blur-image-sm img {filter: blur(0px)}");
                GM_addStyle(".blur-image img {filter: blur(0px)}");
                GM_addStyle(".unblur-btn {visibility: hidden}");
                GM_addStyle(".blur-xl {--tw-blur: blur(0px)}");
            } else {
                $(".mod_description_container").addClass("blur-description");
                $(".hide").removeClass("hide");
                GM_addStyle(".blur-image-sm img {filter: blur(24px)}");
                GM_addStyle(".blur-image img {filter: blur(64px)}");
                GM_addStyle(".unblur-btn {visibility: visible}");
                GM_addStyle(".blur-xl {--tw-blur: blur(24px)}");
            }
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

            buttonNode.addEventListener("click", function () {
                autoRBlur = true;
                remove_blur()});
        } else if (autoRBlur) {
            remove_blur();
        }
    });
})();
