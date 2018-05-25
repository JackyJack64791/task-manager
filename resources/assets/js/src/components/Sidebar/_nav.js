export default {
  items: [
    // {
      // name: 'Панель управления',
      // url: '/dashboard',
      // icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW'
      // }
    // },
      // {
      //   name: 'Задания',
      //   url: '/tasks',
      //   icon: 'icon-note',
      //   children: [
      //     {
      //       name: 'Список заданий',
      //       url: '/tasks',
      //       icon: 'icon-note'
      //     },
      //     {
      //       name: 'Создать новое задание',
      //       url: '/task/create',
      //       icon: 'icon-note'
      //     },
      //   ]
      // },
    {
      title: true,
      name: 'Навигация',
      wrapper: {            // optional wrapper object
        element: 'span',      // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Проекты',
      url: '/projects',
      icon: 'fa fa-files-o',
    //   children: [
    //     {
    //       name: 'Список проектов',
    //       url: '/projects',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Создать новый проект',
    //       url: '/project/create',
    //       icon: 'icon-puzzle'
    //     },
    //     ]
    },
        // {
        //   name: 'Cards',
        //   url: '/components/cards',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Modals',
        //   url: '/components/modals',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Switches',
        //   url: '/components/switches',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Tables',
        //   url: '/components/tables',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Tabs',
        //   url: '/components/tabs',
        //   icon: 'icon-puzzle'
        // }
    //   ]
    // },
    {
      name: 'Задания',
      url: '/tasks',
      icon: 'fa fa-tasks',
    //   children: [
    //     {
    //       name: 'Список заданий',
    //       url: '/tasks',
    //       icon: 'icon-note'
    //     },
    //     {
    //       name: 'Создать новое задание',
    //       url: '/task/create',
    //       icon: 'icon-note'
    //     },
    //   ]
    },
      {
          name: 'Команды',
          url: '/teams',
          icon: 'icon-people',
      },
    // {
    //   name: 'Editors',
    //   url: '/editors',
    //   icon: 'fa fa-code',
    //   children: [
    //     {
    //       name: 'Text Editors',
    //       url: '/editors/text-editors',
    //       icon: 'icon-note'
    //     },
    //     {
    //       name: 'Code Editors',
    //       url: '/editors/code-editors',
    //       icon: 'fa fa-code'
    //     }
    //   ]
    // },
    // {
    //   name: 'Plugins',
    //   url: '/plugins',
    //   icon: 'icon-energy',
    //   children: [
    //     {
    //       name: 'Calendar',
    //       url: '/plugins/calendar',
    //       icon: 'icon-calendar'
    //     },
    //     {
    //       name: 'DataTable',
    //       url: '/plugins/datatable',
    //       icon: 'icon-menu'
    //     },
    //     {
    //       name: 'Loading Buttons',
    //       url: '/plugins/loading-buttons',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Notifications',
    //       url: '/plugins/notifications',
    //       icon: 'icon-info'
    //     },
    //     {
    //       name: 'Spinners',
    //       url: '/plugins/spinners',
    //       icon: 'fa fa-spinner'
    //     },
    //   ]
    // },
    // {
    //   name: 'Icons',
    //   url: '/icons',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Font Awesome',
    //       url: '/icons/font-awesome',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'secondary',
    //         text: '4.7'
    //       }
    //     },
    //     {
    //       name: 'Simple Line Icons',
    //       url: '/icons/simple-line-icons',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },
    // {
    //   name: 'Google Maps',
    //   url: '/google-maps',
    //   icon: 'icon-map',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    {
      divider: true
    },
    {
      title: true,
      name: 'Профиль'
    },
      {
          name: 'Профиль',
          url: '/profile/info',
          icon: 'icon-star',
      }
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/login',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Register',
    //       url: '/register',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/404',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/500',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'UI Kits',
    //   url: '/ui-kits',
    //   icon: 'icon-layers',
    //   children: [
    //     {
    //       name: 'Invoicing',
    //       url: '/ui-kits/invoicing',
    //       icon: 'icon-speech',
    //       children: [
    //         {
    //           name: 'Invoice',
    //           url: '/ui-kits/invoicing/invoice',
    //           icon: 'icon-speech'
    //         }
    //       ]
    //     },
    //     {
    //       name: 'Email',
    //       url: '/ui-kits/email',
    //       icon: 'icon-speech',
    //       children: [
    //         {
    //           name: 'Inbox',
    //           url: '/ui-kits/email/inbox',
    //           icon: 'icon-speech'
    //         },
    //         {
    //           name: 'Message',
    //           url: '/ui-kits/email/message',
    //           icon: 'icon-speech'
    //         },
    //         {
    //           name: 'Compose',
    //           url: '/ui-kits/email/compose',
    //           icon: 'icon-speech'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   divider: true,
    //   class: 'm-2'
    // },
    // {
    //   title: true,
    //   name: 'Labels'
    // },
    // {
    //   name: 'Label danger',
    //   url: '',
    //   icon: 'fa fa-circle',
    //   class: '',
    //   label: {
    //     variant: 'danger',
    //     class: ''
    //   },
    // },
    // {
    //   name: 'Label info',
    //   label: {
    //     variant: 'info'
    //   }
    // },
    // {
    //   name: 'Label warning',
    //   label: {
    //     variant: 'warning'
    //   }
    // },
  ]
};
