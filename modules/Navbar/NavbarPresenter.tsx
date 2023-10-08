import { NavbarActions } from '@modules/Navbar/NavbarActions';
import { Routes } from 'consts/Routes';
import Link from 'next-intl/link';
import { getTranslator } from 'next-intl/server';

export default async function NavbarPresenter({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslator(locale, 'Navbar');

  return (
    <div className='page-container desktop_col-28 mobile_col-16'>
      <div className='flex w-full justify-between py-6'>
        <nav className='flex gap-20 max-md:hidden'>
          <Link href={Routes.LANDING_PAGE}>
            <svg
              width='188'
              height='33'
              xmlns='http://www.w3.org/2000/svg'
              version='1.0'
            >
              <g>
                <g
                  data-gra='path-name'
                  transform='translate(4 3) scale(0.93 0.93)'
                  id='svg_14'
                >
                  <path
                    d='m25.6671,17.6448a3.1521,3.1521 90 0 1 2.7921,4.6222a15.125,15.125 90 1 1 -0.0242,-14.3355a3.1581,3.1581 90 0 1 -2.7649,4.6736a3.1067,3.1067 90 0 1 -2.7497,-1.6154a8.827,8.827 90 1 0 -0.0212,8.3067a3.146,3.146 90 0 1 2.7679,-1.6517l0,0.0001z'
                    fill='currentColor'
                    id='svg_11'
                  />
                  <circle cx='15' cy='15' r='5' fill='#0497d9' id='svg_12' />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_14'
                >
                  <path
                    d='m-29.37272,-87.89975l-7.39,-16.49l-5.55,0l11.76,25.27l2.36,0l11.8,-25.27l-5.6,0l-7.38,16.49z'
                    fill='currentColor'
                    id='svg_15'
                  />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_20'
                >
                  <path
                    d='m24.12726,-104.38975l-10.47,14.48l-10.46,-14.48l-2.51,0l0,25.27l5.12,0l0,-13.98l7.85,10.97l7.82,-10.97l0,13.98l5.16,0l0,-25.27l-2.51,0z'
                    fill='currentColor'
                    id='svg_21'
                  />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_23'
                >
                  <path
                    d='m45.06029,-98.58975l0,1.22c-1.65,-0.97 -3.65,-1.61 -5.7,-1.61c-6.09,0 -9.68,4.87 -9.68,10.07c0,5.17 3.59,10.08 9.68,10.08c2.15,0 4.09,-0.65 5.7,-1.72l0,1.43l4.99,0l0,-19.47l-4.99,0zm0,13.63c-1.22,1.04 -2.9,1.65 -4.8,1.65c-3.51,0 -5.77,-2.66 -5.77,-5.6c0,-2.9 2.22,-5.55 5.77,-5.55c1.86,0 3.58,0.64 4.8,1.68l0,7.82z'
                    fill='currentColor'
                    id='svg_24'
                  />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_26'
                >
                  <path
                    d='m65.72575,-90.98975l7.1,-7.6l-5.84,0l-8.32,8.36l0,-15.92l-4.98,0l0,27.03l4.98,0l0,-4.34l3.77,-3.62l4.98,7.96l5.52,0l-7.21,-11.87z'
                    fill='currentColor'
                    id='svg_27'
                  />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_29'
                >
                  <path
                    d='m92.86134,-87.77249c0,-0.32 0.04,-0.71 0.04,-1.11c0,-6.06 -3.48,-10.39 -9.47,-10.39c-5.88,0 -9.96,4.48 -9.96,10.07c0,5.56 4.08,10.04 9.96,10.04c3.8,0 6.99,-1.58 8.79,-4.02l-3.19,-2.65c-1.08,1.47 -2.98,2.4 -5.02,2.4c-2.98,0 -5.02,-1.79 -5.56,-4.34l14.41,0zm-9.43,-7.53c3.34,0 4.52,2.12 4.7,4.34l-9.64,0c0.46,-2.4 2.33,-4.34 4.94,-4.34z'
                    fill='currentColor'
                    id='svg_30'
                  />
                </g>
                <g
                  data-gra='path-name'
                  transform='translate(76.3143 109.492) scale(1 1)'
                  id='svg_32'
                >
                  <path
                    d='m101.48925,-98.92249l-5.02,0l0,19.47l5.02,0l0,-9.39c0,-2.55 1.36,-5.09 4.94,-5.09c1.04,0 2.41,0.28 2.41,0.28l0,-5.41c-0.4,-0.14 -0.86,-0.21 -1.22,-0.21c-2.76,0.03 -4.81,1.25 -6.13,3.08l0,-2.73z'
                    fill='currentColor'
                    id='svg_33'
                  />
                </g>
              </g>
            </svg>
          </Link>
          <nav className='flex items-center justify-center gap-5'>
            <Link href={Routes.LANDING_PAGE}>{t('home')}</Link>
            <Link href={Routes.CREATE}>{t('create')}</Link>
          </nav>
        </nav>
        <NavbarActions />
      </div>
    </div>
  );
}
