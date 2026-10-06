import Icon from './Icon';
import { socials } from '../data/portfolio';

export default function SocialLinks({ className = '', itemClass = '', size = 18, only, vertical = false }) {
  const list = only ? socials.filter(s => only.includes(s.id)) : socials;
  return (
    <ul className={`flex ${vertical ? 'flex-col' : 'flex-row flex-wrap'} items-center gap-3 ${className}`}>
      {list.map(s => (
        <li key={s.id}>
          <a
            href={s.href}
            target={s.id === 'mail' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`social-btn ${itemClass}`}
          >
            <Icon name={s.id} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
