/**
 * Skeleton Loader Component
 * Shows placeholder while content is loading
 * Better UX than blank screen or spinner
 */
const Skeleton = ({ 
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const baseStyles = 'bg-gray-200 animate-pulse rounded';

  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    circle: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'h-64 w-full rounded-xl',
  };

  const skeletonStyle = {
    width: width || undefined,
    height: height || undefined,
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={skeletonStyle}
      aria-hidden="true"
    />
  ));

  return count > 1 ? (
    <div className="space-y-3">{skeletons}</div>
  ) : (
    skeletons[0]
  );
};

export default Skeleton;