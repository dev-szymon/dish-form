import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../store';

function Response({ data, status }: any) {
  if (data) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          bgcolor={`${status}.main`}
          width="fit-content"
          padding="0.5rem 2rem"
          borderRadius="0.5rem"
          textAlign="center"
          color="#ffffff"
        >
          {status}
        </Box>
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </Box>
    );
  }

  return null;
}

function mapStateToProps({ dishData }: RootState) {
  const { data, status } = dishData;
  return {
    data,
    status,
  };
}

export default connect(mapStateToProps)(Response);
