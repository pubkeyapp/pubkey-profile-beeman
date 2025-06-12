import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { SocialIcon } from "react-social-icons";

const profile = {
  avatar: "https://avatars.githubusercontent.com/u/36491?v=4",
  username: "beeman",
  description: "Developer and Open Source Evangelist",
  socials: {
    x: "https://x.com/beeman_nl",
    telegram: "https://t.me/beemandev",
    linkedin: "https://www.linkedin.com/in/bram-borggreve/",
    github: "https://github.com/beeman",
    discord: "https://discord.com/users/386584531353862154"
  },
  projectLogo: "https://raw.githubusercontent.com/pubkeyapp/pubkey-brand/refs/heads/main/logo/logo-white-txt.png"
};

function App() {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const socialLinks = [
    {
      platform: 'GitHub',
      url: profile.socials.github,
      handle: '@beeman',
      icon: 'github',
      color: 'hover:bg-neutral-700 hover:border-neutral-600',
    },
    {
      platform: 'X',
      url: profile.socials.x,
      handle: '@beeman_nl',
      icon: 'x',
      color: 'hover:bg-blue-500/10 hover:border-blue-400',
    },
    {
      platform: 'LinkedIn',
      url: profile.socials.linkedin,
      handle: '/in/beeman',
      icon: 'linkedin',
      color: 'hover:bg-blue-600/10 hover:border-blue-500',
    },
    {
      platform: 'Telegram',
      url: profile.socials.telegram,
      handle: '@beemandev',
      icon: 'telegram',
      color: 'hover:bg-blue-400/10 hover:border-blue-400',
    },
    {
      platform: 'Discord',
      url: profile.socials.discord,
      handle: 'beeman.dev',
      icon: 'discord',
      color: 'hover:bg-indigo-500/10 hover:border-indigo-400',
    }
  ];

  const copyToClipboard = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHandle(platform);
      setTimeout(() => setCopiedHandle(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <img
                src={profile.avatar}
                alt={`${profile.username}'s avatar`}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl ring-4 ring-neutral-700/50 transition-all duration-300 hover:ring-purple-500/50 hover:shadow-purple-500/20"
              />
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
              {profile.username}
            </h1>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-sm mx-auto">
              {profile.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-3 mb-12">
            {socialLinks.map((social) => {
              const isCopied = copiedHandle === social.platform;

              return (
                <div
                  key={social.platform}
                  className={`group bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 transition-all duration-300 ${social.color} hover:shadow-lg hover:shadow-neutral-900/50 hover:transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <SocialIcon network={social.icon}/>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{social.platform}</h3>
                        <p className="text-sm text-neutral-400">{social.handle}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(social.handle, social.platform)}
                        className="p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors duration-200 group/copy"
                        title="Copy handle"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-green-400"/>
                        ) : (
                          <Copy
                            className="w-4 h-4 text-neutral-400 group-hover/copy:text-white transition-colors duration-200"/>
                        )}
                      </button>

                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors duration-200 group/link"
                        title={`Visit ${social.platform} profile`}
                      >
                        <ExternalLink
                          className="w-4 h-4 text-neutral-400 group-hover/link:text-white transition-colors duration-200"/>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pb-8">
        <div className="text-center">
          <div
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50">
            <span className="text-sm text-neutral-400">Powered by</span>
            <img
              src={profile.projectLogo}
              alt="PubKey Protocol"
              className="h-5 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </footer>

      {/* Copy Success Toast */}
      {copiedHandle && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4"/>
            <span className="text-sm font-medium">Copied {copiedHandle} handle!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;