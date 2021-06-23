import { Box, Typography } from '@material-ui/core';
import DishForm from './components/DishForm';
import Response from './components/Response';

function App() {
  return (
    <div className="App">
      <Box
        component="header"
        display="flex"
        justifyContent="center"
        paddingTop="2rem"
      >
        <Typography variant="h3">Submit your dish</Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        paddingTop="2rem"
      >
        <DishForm />
      </Box>
      <Response />
    </div>
  );
}

export default App;
