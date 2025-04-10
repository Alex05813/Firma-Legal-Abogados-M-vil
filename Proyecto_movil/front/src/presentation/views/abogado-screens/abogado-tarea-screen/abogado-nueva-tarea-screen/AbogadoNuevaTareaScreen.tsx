import React from 'react';
import { View } from 'react-native';
import NoteForm from '../../../../components/AbogadoNoteForm2';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';

type NoteFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoNuevaTareaScreen'>;

const AbogadoNuevaTareaScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = (note: { title: string; description: string }) => {
    // Aquí puedes manejar la creación de la nueva nota
    console.log('Nueva nota:', note);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </View>
  );
};

export default AbogadoNuevaTareaScreen;