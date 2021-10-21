import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from '../Button';
import { COLORS } from '../../theme';
import { useAuth } from '../../hooks/auth';

export const SigninBox = () => {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW} 
        title="ENTRAR COM GITHUB" 
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}