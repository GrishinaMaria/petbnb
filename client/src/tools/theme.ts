// import { extendTheme } from '@chakra-ui/react';

// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: '#1e1f23',
//         color: '#f8f9fb',
//       },
//       a: {
//         color: '#f8f9fb',
//         _hover: {
//           textDecoration: 'underline',
//         },
//       },
//       h1: {
//         color: '#f8f9fb',
//       },
//       h2: {
//         color: '#f8f9fb',
//       },
//       p: {
//         color: '#f8f9fb',
//       },
//     },
//   },
// });

// export default theme;


import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f8f9fb', // light background color
        color: '#1e1f23', // dark text color
      },
      a: {
        color: '#1e1f23', // dark link color
        _hover: {
          // textDecoration: 'underline',
        },
      },
      h1: {
        color: '#1e1f23', // dark heading color
      },
      h2: {
        color: '#1e1f23', // dark heading color
      },
      p: {
        color: '#1e1f23', // dark paragraph color
      },
    },
  },
});

export default theme;
