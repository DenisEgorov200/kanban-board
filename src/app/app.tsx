import { LayoutBase } from '@layouts/base'
import { SignInPage } from '@pages/auth/sign-in'
import { Kanban } from '@widgets/kanban'

export const App = () => {
  return (
    <SignInPage />
    // <LayoutBase>
    //   <Kanban />
    // </LayoutBase>
  )
}
