// ==UserScript==
// @name         NexusMods Extended
// @namespace    https://www.nexusmods.com/
// @version      1.1.6
// @description  Extends page settings and adds utilites
// @author       Toestub
// @match        https://www.nexusmods.com/*
// @match        https://next.nexusmods.com/*
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
        var popularCollections = GM_getValue("popular_collections", false);

        extend_page();
        hide_collections();

        var old_menu = null;
        var new_menu = null;
            try { old_menu = $(".nav-interact-buttons")[0] } catch { console.error("old_menu was undifined");};
            try { new_menu = $('.lg\\:gap-x-2') } catch { console.error("new_menu was undifined");};
        var head = null;
        var menu_item = null;

        if (old_menu != null) {
            const settingsButton = document.createElement("div");
            const settingsButtonBackground = document.createElement("div");
            const settingsButtonIcon = document.createElement("i");
            settingsButton.classList = "nav-interact rj-settings-extended";
            settingsButtonBackground.classList = "ni-background";
            settingsButtonIcon.classList = "material-icons no-select";
            settingsButtonIcon.textContent = "tune";
            settingsButton.appendChild(settingsButtonBackground);
            settingsButton.appendChild(settingsButtonIcon);
            old_menu.appendChild(settingsButton);

            head = document.getElementById("head");
            menu_item = $(".rj-settings-extended");

        }
        else if (new_menu != null) {
            const new_menu_item = document.createElement('div');
            const new_menu_button = document.createElement('button');
            new_menu_item.append(new_menu_button);
            new_menu_button.innerHTML = "<svg viewBox=\"0 0 24 24\" style=\"width: 1.5rem; height: 1.5rem;\" role=\"presentation\" class=\"flex-shrink-0\"><path d=\"M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z\" style=\"fill: currentcolor;\"></path></svg>";
            new_menu.append(new_menu_item);

            new_menu_item.classList = "relative flex items-center justify-center";
            new_menu_button.classList = "flex items-center justify-center shrink-0 rounded-full before:rounded-full transition size-10 cursor-pointer hover-overlay text-neutral-moderate hover:text-neutral-strong select-none";
            new_menu_button.id = "new_menu";
        
            head = document.getElementById('new_menu').parentElement;
            menu_item = $('#new_menu');

            GM_addStyle('.rj-right-tray {position: fixed; right: 0px; top: 55px; --button-width: 76px; overflow: auto; max-width: 3087px; max-height: min(var(--anchor-max-height, 100vh), 1215px);}');
        }
        else {
            console.log(old_menu);
            console.log(new_menu);
        }
        //create settings menu
        //menu button

        //menu panel

        
        GM_addStyle(".rj-notifications-tray .arrow { right: 150px }");
        GM_addStyle(
            ".rj-settings-extended-tray { height: auto; border-radius: 4px; overflow: hidden; }"
        );
        GM_addStyle(
            ".rj-settings-extended-tray-content { min-width: 208px; max-width: 288px; border-radius: 4px; background-color: var(--colour-surface-mid); border: solid 1px var(--colour-stroke-weak); }"
        );
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
            ".blur-image-override img { filter: blur(0px) } .hide { visibility: hidden; height: 0px; padding: 0px; }"
        );
        $("#mainContent").click(function () {
            hideExtendedSettingsTray();
        });

        menu_item.click(ExtendedSettings);
        //$(".rj-notifications").click(function () {
        //    hideExtendedSettingsTray();
        //});
        //$(".rj-profile").click(function () {
        //    hideExtendedSettingsTray();
        //});
        

        //const s = $(".rj-settings-extended-tray");
        function ExtendedSettings() {
            if (document.getElementById("settings_tray") != null ) {
                hideExtendedSettingsTray();
            } else {
                showExtendedSettingsTray();
            }
        }

        function hideExtendedSettingsTray() {
            setTimeout(function () {
                if (head.lastElementChild.classList.contains('rj-open')) {
                    head.removeChild(head.lastElementChild);
                }
            }, 0);
        }

        function showExtendedSettingsTray() {
            setTimeout(function () {
                const settingsTray = document.createElement("div");
                const settingsTrayContent = document.createElement("ul");
                settingsTray.classList = "scrollbar border-stroke-weak bg-surface-mid max-h-128 z-dropdown flex min-w-52 max-w-72 flex-col overflow-auto rounded border py-1.5 text-left shadow-md focus:outline-none max-h-[calc(100vh-3.5rem)] rj-right-tray rj-settings-extended-tray rj-open";
                settingsTray.id = "settings_tray";
                //settingsTray.style = "position: absolute; left: 3167px; top: 55px; --button-width: 76px; overflow: auto; max-width: 3375px; max-height: min(var(--anchor-max-height, 100vh), 1232px);";
                settingsTrayContent.classList = "rj-right-tray-content rj-settings-extended-tray-content";
                settingsTray.appendChild(settingsTrayContent);
                head.appendChild(settingsTray);
                $(".rj-settings-extended-tray-content").append('<li><div class="section-content"><svg viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem;" role="presentation" class="flex-shrink-0"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z" style="fill: currentcolor;"></path></svg><div class="settings-extended-title">Extended Settings</div></div></li><li class="bg-surface-translucent-mid my-1.5 block h-px w-full user-profile-menu-divider"></li>');

                $(".rj-settings-extended-tray-content").append(createToggle("Extend Page Width", "extend-page-width", extendPage));
                $("#extend-page-width").click(function () { extend_page_func(document.getElementById("extend-page-width").children[0].children[0]); });

                $(".rj-settings-extended-tray-content").append(createToggle("Toggle Hide Blur", "toggle-hide-blur", autoRBlur));
                $("#toggle-hide-blur").click(function () { toggle_hide_blur(document.getElementById("toggle-hide-blur").children[0].children[0]); });

                $(".rj-settings-extended-tray-content").append(createToggle("Hide Popular Collections", "toggle-collections", popularCollections));
                $("#toggle-collections").click(function () { toggle_popular_collections(document.getElementById("toggle-collections").children[0].children[0])});
            }, 0);
        }

        /**
         * @param {String} text Text for the setting
         * @param {String} id id to call for click
         * @param {Boolean} enabled whether toggle should be enabled or not
         */
        function createToggle(text, id, enabled) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const div = document.createElement("div");
            const icon = document.createElement("div");

            li.classList = "w-full outline-none text-neutral-moderate text-left transition-colors hover:text-neutral-strong hover:bg-surface-translucent-mid cursor-pointer";
            div.classList = "section-content noselect";
            icon.innerHTML = flipToggle(enabled);
            a.classList = "setting-interact";
            a.id = id;

            li.append(a);
            a.append(div);
            div.append(icon);
            div.append(text);

            return li;
        }

        function flipToggle(variable) {
            if (variable) {
                return '<svg viewBox=\"0 -960 960 960\" style=\"width: 1.5rem; height: 1.5rem;\" role=\"presentation\" class=\"flex-shrink-0\"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" style=\"fill: currentcolor;\"></path></svg>';
            } else {
                return '<svg viewBox=\"0 -960 960 960\" style=\"width: 1.5rem; height: 1.5rem;\" role=\"presentation\" class=\"flex-shrink-0\"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" style=\"fill: currentcolor;\"></path></svg>';
            }
        }

        /**
         * @param {Boolean} toggle the element that contains the toggle icon
         */
        function extend_page_func(toggle) {
            extendPage = !extendPage;
            GM_setValue("extend_page", extendPage);
            toggle.innerHTML = flipToggle(extendPage);
            extend_page();
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
            toggle.innerHTML = flipToggle(autoRBlur);
            remove_blur();
        }

        function remove_blur() {
            if (autoRBlur) {
                $(".mod_adult_warning_wrapper").addClass("hide");
                $(".mod_description_container.blur-description").addClass("blur-removed");
                $(".mod_description_container.blur-description").removeClass("blur-description");
                GM_addStyle(".blur-image-sm img {filter: blur(0px)}");
                GM_addStyle(".blur-image img {filter: blur(0px)}");
                GM_addStyle(".unblur-btn {visibility: hidden}");
                GM_addStyle(".blur-xl {--tw-blur: blur(0px)}");
                document.getElementById('remove-blur').classList.add('hide');
            } else if($('.mod_description_container.blur-removed')[0] != null) {
                $(".mod_description_container").addClass("blur-description");
                $(".mod_description_container").removeClass("blur-removed");
                GM_addStyle(".blur-image-sm img {filter: blur(24px)}");
                GM_addStyle(".blur-image img {filter: blur(64px)}");
                GM_addStyle(".unblur-btn {visibility: visible}");
                GM_addStyle(".blur-xl {--tw-blur: blur(24px)}");
                $(".hide").removeClass("hide");
                document.getElementById('remove-blur').classList.remove('hide');
            } else if($('.blur-image')[0] == null && $('blur-image-sm')[0] == null){
                document.getElementById('remove-blur').classList.add('hide');
            } else {
                GM_addStyle(".blur-image-sm img {filter: blur(24px)}");
                GM_addStyle(".blur-image img {filter: blur(64px)}");
                GM_addStyle(".unblur-btn {visibility: visible}");
                GM_addStyle(".blur-xl {--tw-blur: blur(24px)}");
            }
        }

        function toggle_popular_collections(toggle) {
            popularCollections = !popularCollections;
            GM_setValue("popular_collections", popularCollections);
            toggle.innerHTML = flipToggle(popularCollections);
            hide_collections();
        }

        function hide_collections() {
            try {
                if (popularCollections) {
                    document.getElementById('popular-collections-header').parentElement.parentElement.classList.add("hide");
                } else {
                    document.getElementById('popular-collections-header').parentElement.parentElement.classList.remove("hide");
                }
            } catch {console.warn("Not on home page");}
        }

        const list = document.getElementsByClassName("modactions clearfix")[0];
        if (list) {
            const newNode = document.createElement("li");
            const buttonNode = document.createElement("button");
            buttonNode.classList.add("btn", "inline-flex");
            buttonNode.textContent = "Remove Blur";
            newNode.appendChild(buttonNode);
            newNode.id = "remove-blur";

            list.insertBefore(newNode, list.children[0]);

            buttonNode.addEventListener("click", function () {
                autoRBlur = true;
                remove_blur()
            });
        }
        remove_blur();
    });
})();
