import { sfPro } from './survey/shared'

const fonts = {
  title:  "Merriweather, Georgia, serif",
  body:   "Roboto, system-ui, sans-serif",
  button: sfPro,
}

function WarningIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3L35.5 32H2.5L19 3Z"
        stroke="#F05B60"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="19" y1="15" x2="19" y2="24" stroke="#F05B60" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="19" cy="28.5" r="1.2" fill="#F05B60" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="#4E5961" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function WellframeModal({
  visible,
  title,
  body,
  primaryLabel,
  onPrimaryPress,
  onClose,
  secondaryLabel,
  onSecondaryPress,
  linkText,
  onLinkPress,
}) {
  if (!visible) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      {/* Modal container — stop click from bubbling to backdrop */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 328,
          background: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0 11px 15px rgba(0,0,0,.2), 0 9px 46px rgba(0,0,0,.12), 0 24px 38px rgba(0,0,0,.14)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            height: 50,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: 0 }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Icon zone */}
        <div
          style={{
            padding: '8px 24px 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <WarningIcon />
        </div>

        {/* Body zone */}
        <div
          style={{
            padding: '16px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: fonts.title,
              fontSize: 20,
              fontWeight: 300,
              lineHeight: '25px',
              color: '#0080A3',
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '21px',
              color: '#4F4F4F',
              margin: 0,
            }}
          >
            {body}
          </p>
          {linkText && (
            <button
              onClick={onLinkPress}
              style={{
                fontFamily: fonts.body,
                fontSize: 15,
                fontWeight: 500,
                lineHeight: '20px',
                color: '#0080A3',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {linkText}
            </button>
          )}
        </div>

        {/* Footer zone */}
        <div
          style={{
            padding: '0 24px 17px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <button
            onClick={onPrimaryPress}
            style={{
              fontFamily: fonts.button,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '-0.32px',
              color: '#FFFFFF',
              background: '#0E98BE',
              border: 'none',
              borderRadius: 30,
              height: 56,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            {primaryLabel}
          </button>
          {secondaryLabel && (
            <button
              onClick={onSecondaryPress}
              style={{
                fontFamily: fonts.button,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: '-0.32px',
                color: '#0E98BE',
                background: 'transparent',
                border: '1px solid #0E98BE',
                borderRadius: 30,
                height: 56,
                width: '100%',
                cursor: 'pointer',
              }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/*
// ─── Usage examples ──────────────────────────────────────────────────────────

// 1. Link + secondary button
<WellframeModal
  visible={isOpen}
  title="Are you sure you want to leave?"
  body="Your progress may not be saved if you exit now."
  linkText="Learn more about saving progress"
  onLinkPress={() => console.log('link pressed')}
  primaryLabel="Stay"
  onPrimaryPress={() => setOpen(false)}
  secondaryLabel="Leave anyway"
  onSecondaryPress={() => navigate('/')}
  onClose={() => setOpen(false)}
/>

// 2. Link only
<WellframeModal
  visible={isOpen}
  title="Something went wrong"
  body="We couldn't process your request. Please try again."
  linkText="Contact support"
  onLinkPress={() => openSupport()}
  primaryLabel="Try again"
  onPrimaryPress={() => retry()}
  onClose={() => setOpen(false)}
/>

// 3. Secondary button only
<WellframeModal
  visible={isOpen}
  title="Delete your account?"
  body="This action is permanent and cannot be undone."
  primaryLabel="Keep account"
  onPrimaryPress={() => setOpen(false)}
  secondaryLabel="Delete"
  onSecondaryPress={() => deleteAccount()}
  onClose={() => setOpen(false)}
/>

// 4. Primary CTA only
<WellframeModal
  visible={isOpen}
  title="Session expired"
  body="You've been signed out due to inactivity."
  primaryLabel="Sign in again"
  onPrimaryPress={() => navigate('/login')}
  onClose={() => setOpen(false)}
/>
*/
