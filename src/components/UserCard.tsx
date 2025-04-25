'use client';

import { UserResult } from '@/types';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, MapPin, ExternalLink, BriefcaseIcon, GraduationCap, Calendar } from 'lucide-react';

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage 
              src={profile.profile_picture_url} 
              alt={profile.name}
              onError={() => handleImageError('profile', profile.id)}
            />
            <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl leading-none">{profile.name}</CardTitle>
            <CardDescription className="line-clamp-1">{profile.title}</CardDescription>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>
            <div className="pt-1">
              <Button asChild variant="outline" size="sm" className="h-7 gap-1">
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        <p className="text-sm">{profile.headline}</p>
        
        <Button
          variant="ghost"
          size="sm"
          className="px-0 h-7 w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              <span>Less details</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              <span>More details</span>
            </>
          )}
        </Button>
        
        {showDetails && (
          <div className="space-y-4 pt-2">
            {profile.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">About</h3>
                <p className="text-sm text-muted-foreground">{profile.description}</p>
              </div>
            )}
            
            {experience.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <BriefcaseIcon className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">Experience</h3>
                </div>
                <Separator />
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="grid grid-cols-[36px_1fr] gap-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage 
                          src={exp.company_logo} 
                          alt={exp.company_name}
                          onError={() => handleImageError('company', index.toString())}
                        />
                        <AvatarFallback className="text-xs bg-muted">
                          {exp.company_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">{exp.title}</span>
                          <span className="text-muted-foreground"> · {exp.company_name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{exp.start_date} - {exp.end_date || 'Present'}</span>
                        </div>
                        {exp.description && (
                          <p className="text-xs text-muted-foreground pt-1">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {education.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">Education</h3>
                </div>
                <Separator />
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="grid grid-cols-[36px_1fr] gap-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage 
                          src={edu.school_logo} 
                          alt={edu.school_name}
                          onError={() => handleImageError('school', index.toString())}
                        />
                        <AvatarFallback className="text-xs bg-muted">
                          {edu.school_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">{edu.school_name}</span>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {edu.degree} in {edu.field_of_study}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{edu.start_date} - {edu.end_date}</span>
                        </div>
                        {edu.description && (
                          <p className="text-xs text-muted-foreground pt-1">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 