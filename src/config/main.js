'use strict';

import Vue from 'vue';
import {ready, Item, SourcePropsWindow} from 'xjs-framework';

ready().then(Item.getCurrentSource).then(plg => {
  let configWindow = SourcePropsWindow.getInstance();

  window.TextApp = new Vue({
    el: '#config',

    data: {
      text: '',
      css: ''
    },

    methods: {
      onSave() {
        let config = {
          text: this.text,
          css: this.css
        };

        plg.requestSaveConfig(config);
        configWindow.closeConfig();
      },

      onCancel() {
        configWindow.closeConfig();
      }
    },

    ready() {
      configWindow.useTabbedWindow({
        customTabs: ['Custom'],
        tabOrder: ['Custom', 'Color', 'Layout', 'Transition']
      });

      plg.loadConfig().then(config => {
        this.text = config.text ? config.text : '';
        this.css = config.css ? config.css : '';
      });
    }
  });


});
