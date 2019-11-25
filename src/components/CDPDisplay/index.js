import useMaker from 'hooks/useMaker';
import useSidebar from 'hooks/useSidebar';
import useStore from 'hooks/useStore';
import LoadingLayout from 'layouts/LoadingLayout';
import React, {useEffect, useMemo, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useNavigation} from 'react-navi';
import {getCdp} from 'reducers/cdps';
import {trackCdpById} from 'reducers/multicall/cdps';
import {getColor} from 'styles/theme';

import {Routes, ZERO_ADDRESS} from '../../utils/constants';
import Unavailable from '../Unavailable';

import CDPViewPresentation from './Presentation';

function CDPView({cdpId}) {
  cdpId = parseInt(cdpId, 10);
  const {maker, account, network} = useMaker();
  const {show : showSidebar} = useSidebar();
  const [{cdps, feeds}, dispatch] = useStore();
  const [cdpOwner, setOwner] = useState();
  const [cdpAvailable, setCdpAvailable] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      async function redirect(account) {
        const {search} = (await navigation.getRoute()).url;
        navigation.navigate(
            {pathname : `/${Routes.BORROW}/owner/${account.address}`, search});
      }
      const proxyAddress =
          await maker.service('mcd:cdpManager').getOwner(cdpId);
      if (proxyAddress === ZERO_ADDRESS) {
        account ? redirect(account) : setCdpAvailable(false);
      } else {
        try {
          const cdpOwnerAddress =
              await maker.service('proxy').getOwner(proxyAddress);
          setOwner(cdpOwnerAddress);
        } catch (err) {
          // cdp is not owned by a proxy
          setOwner(proxyAddress);
        }
      }
    })();
  }, [ maker, cdpId, account, navigation ]);

  // this workaround (making useMemo depend on just one feed item) ensures that
  // the view does not re-render when an irrelevant price feed is updated.
  // TODO: there's definitely a more general solution to this issue, but i'm not
  // going to try to figure it out right now. let's collect more data first
  // about how it shows up in different situations.
  const ilk = cdps[cdpId] ? cdps[cdpId].ilk : null;
  const feed = ilk ? feeds.find(f => f.key === ilk) : null;
  const cdp = useMemo(() => getCdp(cdpId, {cdps, feeds : [ feed ]}),
                      [ cdpId, cdps, feed ]);

  useEffect(() => { trackCdpById(maker, cdpId, dispatch); },
            [ cdpId, dispatch, maker ]);

  return useMemo(
    () =>
      cdp.inited && cdpOwner ? (
        <CDPViewPresentation
          cdp={cdp}
          showSidebar={showSidebar}
          account={account}
          network={network}
          cdpOwner={
    cdpOwner.toLowerCase()}
        />
      ) : !cdpAvailable ? (
        <Unavailable />
      ) : (
        <LoadingLayout background={
    getColor('lightGrey')} />
      ),
    [cdp, showSidebar, account, network, cdpOwner, cdpAvailable]
  );
}

export default hot(CDPView);
