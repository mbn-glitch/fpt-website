import { useTranslation } from 'react-i18next';
import { shotFiles } from '../../lib/shots.js';

/**
 * A product screen in the language of the page (src/lib/shots.js): AVIF → WebP → PNG. The <picture> is keyed by its file so a language switch replaces
 * the element — the browser then selects the new sources at once instead of keeping the picture it had already chosen.
 */
export default function Shot({ id, alt, width, height, ...img }) {
  const { i18n } = useTranslation();
  const f = shotFiles(id, i18n.language);
  return (
    <picture key={f.png}>
      <source type="image/avif" srcSet={f.avif} />
      <source type="image/webp" srcSet={f.webp} />
      <img src={f.png} width={width} height={height} alt={alt} decoding="async" {...img} />
    </picture>
  );
}
