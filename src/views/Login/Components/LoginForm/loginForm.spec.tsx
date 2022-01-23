import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18n from 'i18n';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import LoginForm from './index';
// import '@/localization/i18n';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/voirsy-front-end' }),
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  handleSubmit: jest.fn(),
}));

describe('Login Form', () => {
  beforeEach(async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback="Loading">
          <LoginForm />
        </Suspense>
      </I18nextProvider>
    );
  });

  test('Should submit button be disabled', async () => {
    const lazyEmailInput = await waitFor(() => screen.getByTestId('Email'));
    const lazySubmitButton = await waitFor(() => screen.getByTestId('Submit'));
    fireEvent.input(lazyEmailInput, {
      target: {
        value: 'notemail',
      },
    });
    fireEvent.blur(lazyEmailInput);

    expect(lazySubmitButton).toHaveAttribute('disabled');
  });
});
