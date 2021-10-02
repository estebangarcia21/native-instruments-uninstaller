import React, { Dispatch, SetStateAction } from 'react';

export type NavigationLink = 'Uninstallable' | 'Located';

type NavbarLinkProps = {
  name: NavigationLink;
  currentLink: NavigationLink;
  setLink: Dispatch<SetStateAction<NavigationLink>>;
};

function NavbarLink({ name, currentLink, setLink }: NavbarLinkProps) {
  return (
    <button
      className={`py-6 px-12 border-b-2 transition ${
        currentLink === name
          ? 'border-blue-600'
          : 'border-transparent hover:border-blue-200'
      }`}
      onClick={() => setLink(name)}
      type="button"
    >
      <h1 className="font-medium text-sm">{name}</h1>
    </button>
  );
}

export default function Navbar() {
  const [link, setLink] = React.useState<NavigationLink>('Uninstallable');

  return (
    <nav className="flex flex-row h-16 bg-gray-100 border-b justify-center">
      <NavbarLink name="Uninstallable" currentLink={link} setLink={setLink} />
      <NavbarLink name="Located" currentLink={link} setLink={setLink} />
    </nav>
  );
}
