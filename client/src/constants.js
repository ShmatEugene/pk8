import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import { API_URL } from './config';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        // byFile: 'http://localhost:8008/uploadFile',
        byFile: `${API_URL}api/file/add`, //  backend file uploader endpoint
        byUrl: `${API_URL}api/fetchUrl`, // endpoint that provides uploading by Url
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

export const EIDTOR_JS_I18N = {
  /**
   * Internationalzation config
   */
  i18n: {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      /**
       * Other below: translation of different UI components of the editor.js core
       */
      ui: {
        blockTunes: {
          toggler: {
            'Click to tune': 'Нажмите, чтобы настроить',
            'or drag to move': 'или перетащите',
          },
        },
        inlineToolbar: {
          converter: {
            'Convert to': 'Конвертировать в',
          },
        },
        toolbar: {
          toolbox: {
            Add: 'Добавить',
          },
        },
      },

      /**
       * Section for translation Tool Names: both block and inline tools
       */
      toolNames: {
        Text: 'Параграф',
        Heading: 'Заголовок',
        List: 'Список',
        Warning: 'Примечание',
        Checklist: 'Чеклист',
        Quote: 'Цитата',
        Code: 'Код',
        Delimiter: 'Разделитель',
        'Raw HTML': 'HTML-фрагмент',
        Table: 'Таблица',
        Link: 'Ссылка',
        Marker: 'Маркер',
        Bold: 'Полужирный',
        Italic: 'Курсив',
        InlineCode: 'Моноширинный',
      },

      /**
       * Section for passing translations to the external tools classes
       */
      tools: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
         */
        warning: {
          // <-- 'Warning' tool will accept this dictionary section
          Title: 'Название',
          Message: 'Сообщение',
        },

        /**
         * Link is the internal Inline Tool
         */
        link: {
          'Add a link': 'Вставьте ссылку',
        },
        /**
         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
         */
        stub: {
          'The block can not be displayed correctly.': 'Блок не может быть отображен',
        },
      },

      /**
       * Section allows to translate Block Tunes
       */
      blockTunes: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
         *
         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
         */
        delete: {
          Delete: 'Удалить',
        },
        moveUp: {
          'Move up': 'Переместить вверх',
        },
        moveDown: {
          'Move down': 'Переместить вниз',
        },
      },
    },
  },
};
