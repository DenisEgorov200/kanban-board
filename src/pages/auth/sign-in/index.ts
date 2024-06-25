import { currentRoute } from './model'
import { SignInPage } from './ui/sign-in'

export const SignInRoute = {
  view: SignInPage,
  route: currentRoute,
}
