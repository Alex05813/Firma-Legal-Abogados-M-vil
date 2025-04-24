import { getBaseUrl } from './getBaseUrl';

const testGetBaseUrl = async () => {
  try {
    const baseUrl = await getBaseUrl();
    console.log('URL base obtenida automáticamente:', baseUrl);
    alert('URL base obtenida automáticamente: ' + baseUrl);
  } catch (error) {
    console.error('Error al obtener la URL base:', error);
  }
};

testGetBaseUrl();

export default testGetBaseUrl ;
