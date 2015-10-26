'use strict';

import Vue from 'vue';
import {ready, Item, SourcePluginWindow} from 'xjs-framework';

ready().then(Item.getCurrentSource).then(plg => {
  // Enable custom CSS
  return new window.Promise(resolve => {
    plg.enableCustomCSS(true);
    resolve(plg);
  });
}).then(plg => {
  window.TextApp = new Vue({
    el: '#text',

    data: {
      text: ''
    },

    methods: {
      updateCSS(obj) {
        if (obj.css === undefined || typeof obj.css !== 'string') return;
        plg.setCustomCSS(obj.css);
      },

      updateText(obj) {
        if (obj.text === undefined) return;
        this.text = obj.text;
      }
    },

    ready() {
      let sourceWindow = SourcePluginWindow.getInstance();

      // Load configuration
      plg.loadConfig().then(obj => {
        this.updateText(obj);
        this.updateCSS(obj);
      });

      // Add event listeners
      sourceWindow.on('save-config', obj => {
        this.updateText(obj);
        this.updateCSS(obj);
        plg.saveConfig(obj);
      });

      /**
       * Incase you want to just apply the configuration, but not save it...
       *
       * //sourceWindow.on('apply-config', this.updateText);
       *
       * But we do not need it for now :)
       */
    }
  });
});