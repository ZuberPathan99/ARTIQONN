import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { serviceGroups, services } from '@/data/services';

export function ServiceCatalogue() {
  return (
    <div className="service-catalogue">
      {serviceGroups.map((group, index) => (
        <details
          key={group.title}
          id={String(index + 1)}
          className="service-catalogue-group"
          name="artiqonn-services"
        >
          <summary className="service-category-trigger">
            <h3 className="service-catalogue-label">
              <span className="service-category-number">{group.number} /</span>{' '}
              {group.title}
            </h3>
            <Plus
              size={25}
              strokeWidth={1.25}
              className="service-category-toggle"
              aria-hidden="true"
            />
          </summary>
          <div className="service-category-panel">
            <figure className="service-category-image">
              <img
                src={group.image + '-960.webp'}
                srcSet={
                  group.image +
                  '-640.webp 640w, ' +
                  group.image +
                  '-960.webp 960w, ' +
                  group.image +
                  '-1600.webp 1600w'
                }
                sizes="(max-width: 767px) 90vw, 40vw"
                width="1600"
                height="1067"
                loading="lazy"
                decoding="async"
                alt={group.imageAlt}
              />
              <figcaption>Original concept study</figcaption>
            </figure>
            <div className="service-category-content">
              <p className="service-category-intro">{group.introduction}</p>
              <ul>
                {services
                  .filter((service) => service.group === group.title)
                  .map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={'/services/' + service.slug}
                        className="service-catalogue-link"
                      >
                        <span>{service.title}</span>
                        <ArrowUpRight
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
