import React, { FC } from 'react';
import {
  Grid,
  CopyIcon,
  DetailPanelAction,
  DetailPanelPortal,
  DetailPanelSection,
  PanelField,
  PanelLabel,
  PanelRow,
  BufferedTextArea,
  useNotification,
  useTranslation,
  ColorSelectButton,
  useBufferState,
} from '@openmsupply-client/common';
import { useInboundFields, useInbound, useIsInboundDisabled } from '../api';

const AdditionalInfoSection: FC = () => {
  const { comment, colour, update } = useInboundFields(['comment', 'colour']);
  const isDisabled = useIsInboundDisabled();
  const t = useTranslation(['common', 'replenishment']);
  const [bufferedColor, setBufferedColor] = useBufferState(colour);

  return (
    <DetailPanelSection title={t('heading.additional-info')}>
      <Grid container gap={0.5} key="additional-info">
        <PanelRow>
          <PanelLabel>{t('label.entered-by')}</PanelLabel>
        </PanelRow>

        <PanelRow>
          <PanelLabel>{t('label.color')}</PanelLabel>
          <PanelField>
            <ColorSelectButton
              disabled={isDisabled}
              onChange={({ hex }) => {
                setBufferedColor(hex);
                update({ colour: hex });
              }}
              color={bufferedColor}
            />
          </PanelField>
        </PanelRow>

        <PanelLabel>{t('heading.comment')}</PanelLabel>
        <BufferedTextArea
          disabled={isDisabled}
          onChange={e => update({ comment: e.target.value })}
          value={comment}
        />
      </Grid>
    </DetailPanelSection>
  );
};

// const RelatedDocumentsRow: FC<{
//   label: string;
//   to: string;
//   value?: number | null;
// }> = ({ label, to, value }) => {
//   const { success } = useNotification();
//   return (
//     <PanelRow>
//       <PanelLabel>{label}</PanelLabel>
//       <PanelField>
//         <Link to={to} onClick={success('Not implemented yet!')}>
//           {value}
//         </Link>
//       </PanelField>
//     </PanelRow>
//   );
// };

const RelatedDocumentsSection: FC = () => {
  const t = useTranslation('replenishment');
  return (
    <DetailPanelSection title={t('heading.related-documents')}>
      <Grid container gap={0.5} key="additional-info">
        {/* <RelatedDocumentsRow
          label={t('label.requisition')}
          to=""
          value={draft.requisitionNumber}
        />
        <RelatedDocumentsRow
          label={t('label.inbound-shipment')}
          to=""
          value={draft.inboundShipmentNumber}
        />
        <RelatedDocumentsRow
          label={t('label.goods-receipt')}
          to=""
          value={draft.goodsReceiptNumber}
        />
        <RelatedDocumentsRow
          label={t('label.purchase-order')}
          to=""
          value={draft.purchaseOrderNumber}
        /> */}
      </Grid>
    </DetailPanelSection>
  );
};

export const SidePanel: FC = () => {
  const { data } = useInbound();
  const { success } = useNotification();
  const t = useTranslation('common');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 4) ?? '');
    success('Copied to clipboard successfully')();
  };

  return (
    <DetailPanelPortal
      Actions={
        <>
          <DetailPanelAction
            icon={<CopyIcon />}
            title={t('link.copy-to-clipboard')}
            onClick={copyToClipboard}
          />
        </>
      }
    >
      <AdditionalInfoSection />
      <RelatedDocumentsSection />
    </DetailPanelPortal>
  );
};
