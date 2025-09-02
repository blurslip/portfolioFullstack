export default function BlobAvatar() {
  return (
    <div className="relative w-[320px] h-[360px]">
      {/* optional soft background behind the photo */}
      <div className="absolute inset-0 translate-x-2 translate-y-1 blur-2xl bg-emerald-400/25 rounded-full" />

      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 drop-shadow-xl"
        aria-hidden
      >
        <clipPath id="blobClip">
          {/* Smooth rounded triangle-ish blob */}
          <path d="M457.8,347.1Q426.2,444.2,331.3,485.6Q236.4,527,158.7,462.2Q81,397.4,72.9,298.7Q64.8,200,139.3,134.7Q213.8,69.3,317.1,84.2Q420.4,99.1,458.8,199.6Q497.3,300,457.8,347.1Z" />
        </clipPath>

        {/* Your image, clipped by the blob */}
        <image
          href="../assets/portfolioimage.png"                       /* <-- replace with your path */
          width="600"
          height="600"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#blobClip)"
        />
      </svg>
    </div>
  );
}
