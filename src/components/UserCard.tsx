'use client';

import { UserResult } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface UserCardProps {
  user: UserResult;
}

export default function UserCard({ user }: UserCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [failedLogoImages, setFailedLogoImages] = useState<Record<string, boolean>>({});
  const { profile, experience, education } = user;

  const handleImageError = (type: 'profile' | 'company' | 'school', id: string) => {
    if (type === 'profile') {
      setProfileImageError(true);
    } else {
      setFailedLogoImages(prev => ({
        ...prev,
        [`${type}-${id}`]: true
      }));
    }
  };

  return (
    <div className="shadow-md rounded-lg overflow-hidden mb-4" style={{ 
      backgroundColor: 'var(--card-bg)', 
      boxShadow: '0 1px 3px 0 var(--card-border)' 
    }}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 relative mr-4 flex-shrink-0">
            {profile.profile_picture_url && !profileImageError ? (
              <Image
                src={profile.profile_picture_url}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
                onError={() => handleImageError('profile', profile.id)}
                unoptimized // Bypass Next.js image optimization for external URLs
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center" 
                style={{ 
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-secondary)'
                }}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {profile.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>{profile.title}</p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{profile.location}</p>
            <a 
              href={profile.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:underline"
              style={{ color: 'var(--button-primary)' }}
            >
              View on LinkedIn
            </a>
          </div>
        </div>
        
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{profile.headline}</p>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="hover:underline"
          style={{ color: 'var(--button-primary)' }}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
        
        {showDetails && (
          <div className="mt-4">
            {profile.description && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>About</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{profile.description}</p>
              </div>
            )}
            
            {experience.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Experience</h3>
                <div className="space-y-3">
                  {experience.map((exp, index) => (
                    <div key={index} className="flex">
                      <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                        {exp.company_logo && !failedLogoImages[`company-${index}`] ? (
                          <Image
                            src={exp.company_logo}
                            alt={exp.company_name}
                            fill
                            className="object-contain"
                            onError={() => handleImageError('company', index.toString())}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs"
                            style={{ 
                              backgroundColor: 'var(--input-bg)',
                              color: 'var(--text-tertiary)'
                            }}>
                            {exp.company_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{exp.title}</h4>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{exp.company_name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {exp.start_date} - {exp.end_date || 'Present'}
                        </p>
                        {exp.description && (
                          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {education.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Education</h3>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="flex">
                      <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                        {edu.school_logo && !failedLogoImages[`school-${index}`] ? (
                          <Image
                            src={edu.school_logo}
                            alt={edu.school_name}
                            fill
                            className="object-contain"
                            onError={() => handleImageError('school', index.toString())}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs"
                            style={{ 
                              backgroundColor: 'var(--input-bg)',
                              color: 'var(--text-tertiary)'
                            }}>
                            {edu.school_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{edu.school_name}</h4>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.degree} in {edu.field_of_study}</p>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {edu.start_date} - {edu.end_date}
                        </p>
                        {edu.description && (
                          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 