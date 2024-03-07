// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';

type TSwitchThemeProps = {
  className?: string;
  children?: string;

}
const SwitchTheme = (
  { className='', children=''}: TSwitchThemeProps
): JSX.Element => {
  return (
    <div className={className} aria-label="switch-theme">
      {children}
      <DarkIcon id="dark-icon"/>
      <LightIcon id="light-icon"/>
    </div>
  );
};
export default SwitchTheme;