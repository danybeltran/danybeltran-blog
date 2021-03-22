export default function ShareButton({ postUrl = "firt-post" }) {
  const shareUrl = encodeURIComponent(
    `https://blog.danybeltran.me/post/${postUrl}`
  );
  return (
    <iframe
      src={`https://www.facebook.com/plugins/share_button.php?href=${shareUrl}&layout=button&size=small&width=96&height=32&appId`}
      width="96"
      height="20"
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      frameBorder="0"
      className="-mr-7"
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  );
}
